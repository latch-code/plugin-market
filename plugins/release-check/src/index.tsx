import { useEffect, useMemo, useRef, useState } from 'react'
import { defineApp, type AppTask, type Latch, type PageProps } from '@latch/app-sdk'
import {
  LIMITS,
  buildPrompt,
  parseReply,
  readChecklist,
  readPending,
  readRun,
  tally,
  when,
  type CheckItem,
  type ItemResult,
  type Pending,
  type Run,
} from './checklist.ts'
import './style.css'

/** What this tab remembers across a reload of the page or a new version (never the Host's copy of anything). */
interface ViewState {
  projectId?: string
  harnessId?: string
  /** The start in flight, so a reload finds it even when the `pending` document could not be written. */
  requestId?: string
  draft?: CheckItem[]
}

type Doc<T> = { value: T; version: number }

type Activity =
  | { kind: 'idle' }
  | { kind: 'starting' }
  | { kind: 'running'; sessionId: string }
  | { kind: 'unknown'; pending: Pending; checking: boolean }
  | { kind: 'refused'; code: string }
  | { kind: 'save-failed'; sessionId: string }

const PENDING = 'pending'
const CHECKLIST = 'checklist'
const RUN_PREFIX = 'runs/'

const codeOf = (cause: unknown): string =>
  typeof cause === 'object' && cause !== null && typeof (cause as { code?: unknown }).code === 'string'
    ? (cause as { code: string }).code
    : 'unknown'
const versionOf = (cause: unknown): number | undefined => {
  const version = typeof cause === 'object' && cause !== null ? (cause as { version?: unknown }).version : undefined
  return typeof version === 'number' ? version : undefined
}
const newId = (): string => crypto.randomUUID()
const shortId = () => crypto.randomUUID().slice(0, 8)

const REFUSED: Record<string, string> = {
  forbidden: '这台设备不能开始会话',
  'rate-limited': '开始得太频繁，过一分钟再试',
  'capability-denied': '这个页面不能开始会话',
  'not-found': '找不到这个项目或 Harness',
  'invalid-input': '这次检查的内容不完整',
  offline: '离线，连上后再试',
  preview: '预览里不会开会话',
}

const FINISHED = new Set(['failed', 'cancelled', 'interrupted'])
/** A session this page follows is done once its run has an outcome. */
const settled = (task: AppTask | undefined) =>
  task !== undefined && !task.running && (task.runOutcome !== undefined || FINISHED.has(task.status))

function Page({ latch, ui }: PageProps) {
  const saved = useRef<ViewState>(latch.view.getState<ViewState>() ?? {})
  const remember = (patch: Partial<ViewState>) => {
    const next: ViewState = { ...saved.current, ...patch }
    for (const key of Object.keys(next) as Array<keyof ViewState>) if (next[key] === undefined) delete next[key]
    saved.current = next
    try {
      latch.view.setState(next)
    } catch {
      // Over the view's size: the tab simply forgets it.
    }
  }

  const [info, setInfo] = useState(() => latch.host.info())
  useEffect(() => latch.host.onChange(setInfo), [latch])
  const [tasks, setTasks] = useState<AppTask[] | undefined>()
  const [listOffline, setListOffline] = useState(false)
  useEffect(
    () =>
      latch.tasks.subscribe({ limit: 200 }, update => {
        setTasks(update.tasks)
        setListOffline(update.offline)
      }),
    [latch],
  )
  const offline = info.offline || listOffline
  const canWrite = info.canRun && !offline

  // Projects and Harnesses come from the sessions this device can see, newest first.
  const projects = useMemo(() => {
    const seen = new Map<string, string>()
    for (const task of tasks ?? [])
      if (task.projectId && !seen.has(task.projectId)) seen.set(task.projectId, task.projectName ?? task.projectId)
    return [...seen].map(([id, name]) => ({ id, name }))
  }, [tasks])
  const [projectChoice, setProjectChoice] = useState(saved.current.projectId)
  const project = projects.find(item => item.id === projectChoice)
    ?? projects[0] ?? { id: projectChoice ?? 'default', name: projectChoice ?? 'default' }
  // The picker shows the four most recent projects; a chosen older one takes the last place so it still shows as selected.
  const recentProjects = projects.slice(0, 4)
  const projectOptions =
    recentProjects.includes(project) || !projects.includes(project) ? recentProjects : [...recentProjects.slice(0, 3), project]
  const harnesses = useMemo(() => {
    const ids: string[] = []
    const ordered = [...(tasks ?? []).filter(task => task.projectId === project.id), ...(tasks ?? [])]
    for (const task of ordered) if (!ids.includes(task.harnessId) && task.harnessId !== 'preview') ids.push(task.harnessId)
    return ids.slice(0, 4)
  }, [tasks, project.id])
  const [harnessChoice, setHarnessChoice] = useState(saved.current.harnessId)
  const harness = harnessChoice && harnesses.includes(harnessChoice) ? harnessChoice : harnesses[0]
  // The name the device shows for a Harness; its ID only when the Host lists no name for it.
  const harnessLabel = (id: string) => info.harnesses.find(item => item.id === id)?.name ?? id
  const scope = `project:${project.id}`

  const [checklist, setChecklist] = useState<Doc<CheckItem[]> | undefined>()
  const [runs, setRuns] = useState<Array<Doc<Run>> | undefined>()
  const [pending, setPending] = useState<Doc<Pending> | null | undefined>()
  const [loadError, setLoadError] = useState('')
  const [activity, setActivity] = useState<Activity>({ kind: 'idle' })
  const [justFinished, setJustFinished] = useState('')

  const loadProject = async (target: string) => {
    const [list, docs] = await Promise.all([latch.storage.get(`project:${target}`, CHECKLIST), latch.storage.list(`project:${target}`)])
    if (`project:${target}` !== scopeRef.current) return
    setChecklist({ value: readChecklist(list?.value), version: list?.version ?? 0 })
    const found: Array<Doc<Run>> = []
    for (const doc of docs) {
      if (!doc.key.startsWith(RUN_PREFIX)) continue
      const run = readRun(doc.value)
      if (run) found.push({ value: run, version: doc.version })
    }
    found.sort((a, b) => b.value.startedAt.localeCompare(a.value.startedAt))
    setRuns(found)
  }
  const scopeRef = useRef(scope)
  scopeRef.current = scope
  useEffect(() => {
    if (tasks === undefined) return
    setChecklist(undefined)
    setRuns(undefined)
    setLoadError('')
    loadProject(project.id).catch((cause: unknown) => setLoadError(codeOf(cause)))
  }, [scope, tasks === undefined])

  // A start this tab or another device left unsettled: find its session, never start a second one.
  const reconcile = async () => {
    const doc = await latch.storage.get('plugin', PENDING)
    const value = readPending(doc?.value)
    if (!doc || !value) {
      setPending(null)
      const requestId = saved.current.requestId
      if (requestId) await settle({ requestId, projectId: project.id, projectName: project.name, startedAt: '', items: [] }, undefined)
      return
    }
    setPending({ value, version: doc.version })
    if (value.projectId !== project.id && projects.some(item => item.id === value.projectId)) choose(value.projectId)
    if (value.sessionId) setActivity({ kind: 'running', sessionId: value.sessionId })
    else await settle(value, doc.version)
  }
  useEffect(() => {
    if (tasks === undefined) return
    reconcile().catch((cause: unknown) => setLoadError(codeOf(cause)))
  }, [tasks === undefined])

  /** Asks the Host whether a start with this request ID made a session. */
  const settle = async (value: Pending, version: number | undefined) => {
    setActivity({ kind: 'unknown', pending: value, checking: true })
    try {
      const found = await latch.tasks.lookup(value.requestId)
      if (found.status === 'found') {
        await attach(value, version, found.sessionId)
        return
      }
      if (found.status === 'pending') {
        setActivity({ kind: 'starting' })
        setTimeout(() => {
          settle(value, version).catch(() => {})
        }, 2000)
        return
      }
      if (!value.items.length) {
        // Only this tab knew of it and the Host has nothing: it never started.
        remember({ requestId: undefined })
        setActivity({ kind: 'idle' })
        return
      }
    } catch {
      // Still unknown: the person decides to look again or to retry the same request.
    }
    setActivity({ kind: 'unknown', pending: value, checking: false })
  }

  const attach = async (value: Pending, version: number | undefined, sessionId: string) => {
    const next = { ...value, sessionId }
    // The session ID goes into `pending` before the page follows it, so whoever settles the run finds it there.
    if (version !== undefined)
      try {
        const written = await latch.storage.put('plugin', PENDING, next, { ifVersion: version })
        setPending({ value: next, version: written.version })
      } catch {
        setPending({ value: next, version })
      }
    setActivity({ kind: 'running', sessionId })
  }

  const start = async () => {
    const items = checklist?.value ?? []
    if (!items.length || !canWrite) return
    const value: Pending = {
      requestId: newId(),
      projectId: project.id,
      projectName: project.name,
      startedAt: new Date().toISOString(),
      items,
      ...(harness ? { harnessId: harness } : {}),
    }
    setJustFinished('')
    setActivity({ kind: 'starting' })
    remember({ requestId: value.requestId, projectId: project.id, ...(harness ? { harnessId: harness } : {}) })
    let version: number
    try {
      version = (await latch.storage.put('plugin', PENDING, value, { ifVersion: pending?.version ?? 0 })).version
    } catch (cause) {
      remember({ requestId: undefined })
      if (versionOf(cause) !== undefined) {
        // Another device started a check meanwhile: follow that one.
        await reconcile()
        return
      }
      setActivity({ kind: 'refused', code: codeOf(cause) })
      return
    }
    setPending({ value, version })
    await send(value, version)
  }

  const send = async (value: Pending, version: number | undefined) => {
    setActivity({ kind: 'starting' })
    try {
      const started = await latch.tasks.start({
        prompt: buildPrompt(value.items),
        title: `发布检查 · ${value.projectName}`.slice(0, 120),
        projectId: value.projectId,
        requestId: value.requestId,
        ...(value.harnessId ? { harnessId: value.harnessId } : {}),
      })
      await attach(value, version, started.sessionId)
    } catch (cause) {
      const code = codeOf(cause)
      if (code === 'unknown') {
        setActivity({ kind: 'unknown', pending: value, checking: false })
        return
      }
      // Refused before any session: the pending start is withdrawn.
      remember({ requestId: undefined })
      if (version !== undefined) await latch.storage.delete('plugin', PENDING, { ifVersion: version }).catch(() => {})
      setPending(null)
      setActivity({ kind: 'refused', code })
    }
  }

  // Follow the running session; once it settles, read its reply and keep the result.
  const finishing = useRef('')
  const followed = activity.kind === 'running' || activity.kind === 'save-failed' ? activity.sessionId : ''
  const task = tasks?.find(item => item.id === followed)
  useEffect(() => {
    if (activity.kind !== 'running' || !settled(task) || finishing.current === activity.sessionId) return
    finishing.current = activity.sessionId
    void finish(activity.sessionId, task!).finally(() => {
      finishing.current = ''
    })
  }, [activity, task])

  const finish = async (sessionId: string, done: AppTask) => {
    try {
      // Read `pending` again: this tab's copy may be older than what this or another device wrote since.
      const stored = await latch.storage.get('plugin', PENDING)
      const value = readPending(stored?.value)
      const doc = stored && value?.sessionId === sessionId ? { value, version: stored.version } : undefined
      const sent = doc?.value
      const reply = await latch.tasks.readReply(sessionId)
      const items = sent?.items.length ? sent.items : (checklist?.value ?? [])
      const text = reply.reply?.text ?? ''
      const results = parseReply(text, items)
      const outcome = (reply.runOutcome ?? done.runOutcome ?? (done.status === 'idle' ? 'completed' : done.status)) as Run['outcome']
      const run: Run = {
        sessionId,
        requestId: sent?.requestId ?? '',
        projectId: sent?.projectId ?? project.id,
        startedAt: sent?.startedAt || done.updatedAt,
        finishedAt: new Date().toISOString(),
        outcome: ['completed', 'failed', 'cancelled', 'interrupted'].includes(outcome) ? outcome : 'completed',
        structured: results !== undefined,
        items: results ?? items.map(item => ({ ...item, status: 'missing' as const, evidence: '' })),
        note: '',
        ...(sent?.harnessId ? { harnessId: sent.harnessId } : {}),
        ...(results === undefined && text ? { reply: text.slice(0, LIMITS.reply) } : {}),
      }
      const target = `project:${run.projectId}`
      try {
        await latch.storage.put(target, RUN_PREFIX + sessionId, run, { ifVersion: 0 })
      } catch (cause) {
        // Already kept by another device (or by this one's earlier try): that copy stands.
        if (versionOf(cause) === undefined) throw cause
      }
      if (doc) await latch.storage.delete('plugin', PENDING, { ifVersion: doc.version }).catch(() => {})
      setPending(null)
      remember({ requestId: undefined })
      setJustFinished(sessionId)
      setActivity({ kind: 'idle' })
      if (target === scopeRef.current) await loadProject(run.projectId)
    } catch {
      setActivity({ kind: 'save-failed', sessionId })
    }
  }

  // The checklist editor: a draft in this tab's view state until 保存.
  const [draft, setDraft] = useState<CheckItem[] | undefined>(saved.current.draft)
  const editing = draft !== undefined

  // Another device or tab changed something this page shows.
  useEffect(
    () =>
      latch.storage.onChange(change => {
        if (change.scope === 'plugin' && change.key === PENDING) {
          if (activity.kind === 'idle') reconcile().catch(() => {})
          return
        }
        if (change.scope !== scopeRef.current) return
        if (change.key === CHECKLIST && change.version !== checklist?.version && !editing) loadProject(project.id).catch(() => {})
        if (change.key.startsWith(RUN_PREFIX)) loadProject(project.id).catch(() => {})
      }),
    [latch, activity.kind, checklist?.version, project.id, editing],
  )

  const choose = (id: string) => {
    setProjectChoice(id)
    remember({ projectId: id })
  }

  const [listSave, setListSave] = useState<{
    state: 'idle' | 'saving' | 'conflict' | 'unknown' | 'failed'
    requestId?: string
    version?: number
  }>({
    state: 'idle',
  })
  const editDraft = (next: CheckItem[] | undefined) => {
    setDraft(next)
    remember({ draft: next })
  }
  const saveList = async (ifVersion: number, requestId = newId()) => {
    if (!draft) return
    const items = draft.map(item => ({ ...item, title: item.title.trim(), where: item.where.trim() })).filter(item => item.title)
    setListSave({ state: 'saving', requestId })
    try {
      const written = await latch.storage.put(scope, CHECKLIST, { items }, { ifVersion, requestId })
      setChecklist({ value: items, version: written.version })
      editDraft(undefined)
      setListSave({ state: 'idle' })
    } catch (cause) {
      const code = codeOf(cause)
      const version = versionOf(cause)
      if (version !== undefined) setListSave({ state: 'conflict', version })
      else if (code === 'unknown') setListSave({ state: 'unknown', requestId })
      else setListSave({ state: 'failed' })
    }
  }

  const latest = runs?.[0]?.value
  const results = new Map<string, ItemResult>()
  // Marks only for a finished, readable check, and only while nothing newer is under way.
  if (latest?.structured && latest.outcome === 'completed' && activity.kind === 'idle')
    for (const item of latest.items) results.set(item.id, item)
  const items = checklist?.value ?? []
  const busy = activity.kind === 'starting' || activity.kind === 'running' || (activity.kind === 'unknown' && activity.checking)

  if (loadError && !checklist)
    return (
      <div className="rc">
        <ui.Notice tone={loadError === 'offline' ? 'warn' : 'error'} title={loadError === 'offline' ? '离线' : '没有读到清单'}>
          {loadError === 'offline' ? '连上后再打开这个页面' : null}
        </ui.Notice>
      </div>
    )
  if (tasks === undefined || !checklist || !runs || pending === undefined)
    return (
      <div className="rc">
        <ui.Loading label="正在读取清单" />
      </div>
    )

  const startLabel = latest && !busy ? '再查一次' : activity.kind === 'refused' ? '再试一次' : '开始检查'
  const primary =
    activity.kind === 'unknown' ? (
      <ui.Button
        variant="primary"
        loading={activity.checking}
        disabled={offline}
        onClick={() => settle(activity.pending, pending?.version)}>
        查询结果
      </ui.Button>
    ) : editing ? null : (
      <ui.Button variant="primary" loading={busy} disabled={busy || !items.length || !canWrite} onClick={() => start()}>
        {startLabel}
      </ui.Button>
    )

  return (
    <div className="rc">
      <header className="rc-head">
        <div className="rc-title">
          <h2>发布检查</h2>
          <p className="rc-sub">{project.name}</p>
        </div>
        {primary}
      </header>

      <div className="rc-target">
        <span className="rc-muted">在</span>
        {projects.length > 1 ? (
          <ui.Segmented
            label="项目"
            value={project.id}
            options={projectOptions.map(item => ({ value: item.id, label: item.name }))}
            onChange={choose}
            disabled={busy || editing}
          />
        ) : (
          <ui.Badge>{project.name}</ui.Badge>
        )}
        {harnesses.length > 1 ? (
          <ui.Segmented
            label="Harness"
            value={harness ?? ''}
            options={harnesses.map(id => ({ value: id, label: harnessLabel(id) }))}
            onChange={id => {
              setHarnessChoice(id)
              remember({ harnessId: id })
            }}
            disabled={busy}
          />
        ) : harness ? (
          <ui.Badge>{harnessLabel(harness)}</ui.Badge>
        ) : null}
        <ui.Hint label="开一个真实会话">检查作为这个项目里的一个普通会话运行，用项目的默认权限；结果与意见存在插件数据里。</ui.Hint>
      </div>

      {activity.kind === 'unknown' ? (
        <ui.Notice
          tone="warn"
          title="开始结果未知"
          action={
            <ui.Button variant="ghost" disabled={offline || activity.checking} onClick={() => send(activity.pending, pending?.version)}>
              重试同一请求
            </ui.Button>
          }>
          重试不会多开会话 · <span className="rc-mono">{activity.pending.requestId}</span>
        </ui.Notice>
      ) : null}
      {activity.kind === 'refused' ? (
        <ui.Notice tone="error" title="检查会话没开始">
          {REFUSED[activity.code] ?? '没有开始，请再试一次'}
        </ui.Notice>
      ) : null}
      {activity.kind === 'save-failed' ? (
        <ui.Notice
          tone="error"
          title="结果没有保存"
          action={
            <ui.Button variant="ghost" disabled={offline} onClick={() => setActivity({ kind: 'running', sessionId: activity.sessionId })}>
              重试
            </ui.Button>
          }
        />
      ) : null}

      {editing ? (
        <Editor
          ui={ui}
          draft={draft}
          state={listSave}
          disabled={!canWrite}
          onChange={editDraft}
          onCancel={() => {
            editDraft(undefined)
            setListSave({ state: 'idle' })
          }}
          onSave={() => void saveList(checklist.version, listSave.state === 'unknown' ? listSave.requestId : undefined)}
          onOverwrite={() => void saveList(listSave.version ?? checklist.version)}
          onReload={() => {
            editDraft(undefined)
            setListSave({ state: 'idle' })
            loadProject(project.id).catch(() => {})
          }}
        />
      ) : items.length ? (
        <ui.Group
          title="清单"
          action={
            <ui.Button variant="ghost" size="xs" disabled={!canWrite || busy} onClick={() => editDraft(items.map(item => ({ ...item })))}>
              编辑
            </ui.Button>
          }>
          {items.map(item => (
            <Item key={item.id} ui={ui} item={item} result={results.get(item.id)} />
          ))}
        </ui.Group>
      ) : (
        <ui.Group title="清单">
          <ui.Empty
            title="还没有检查项"
            action={
              <ui.Button disabled={!canWrite} onClick={() => editDraft([{ id: shortId(), title: '', where: '' }])}>
                添加第一项
              </ui.Button>
            }
          />
        </ui.Group>
      )}

      {activity.kind === 'running' || activity.kind === 'starting' ? (
        <div className="rc-session">
          <ui.Progress active label="检查会话运行中" />
          <ui.Row title="检查会话" description={activity.kind === 'starting' ? '正在开始' : '运行中'}>
            {activity.kind === 'running' && tasks.some(item => item.id === activity.sessionId) ? (
              <ui.Button variant="ghost" size="xs" onClick={() => latch.nav.openSession(activity.sessionId).catch(() => {})}>
                打开会话
              </ui.Button>
            ) : null}
          </ui.Row>
        </div>
      ) : null}

      {latest && !busy && activity.kind !== 'unknown' ? (
        <Outcome
          ui={ui}
          latch={latch}
          run={runs[0]!}
          fresh={justFinished === latest.sessionId}
          canWrite={canWrite}
          scope={scope}
          tasks={tasks}
        />
      ) : null}

      {offline ? (
        <p className="rc-offline">离线 · 清单只能看，连上后才能检查</p>
      ) : info.preview ? (
        <ui.Badge>预览</ui.Badge>
      ) : !info.canRun ? (
        <p className="rc-muted">这台设备只能查看</p>
      ) : null}
    </div>
  )
}

function Item({ ui, item, result }: { ui: PageProps['ui']; item: CheckItem; result: ItemResult | undefined }) {
  const evidence = result?.evidence ?? ''
  const description = [item.where, evidence].filter(Boolean).join(' · ')
  const mark =
    result?.status === 'pass' ? (
      <ui.Status tone="ok">通过</ui.Status>
    ) : result?.status === 'fail' ? (
      <ui.Status tone="err">没通过</ui.Status>
    ) : result?.status === 'unknown' ? (
      <ui.Status>查不清</ui.Status>
    ) : result?.status === 'missing' ? (
      <ui.Status>没有结果</ui.Status>
    ) : undefined
  return <ui.Row title={item.title} {...(description ? { description } : {})} {...(mark ? { children: mark } : {})} />
}

function Editor(props: {
  ui: PageProps['ui']
  draft: CheckItem[]
  state: { state: 'idle' | 'saving' | 'conflict' | 'unknown' | 'failed' }
  disabled: boolean
  onChange: (draft: CheckItem[]) => void
  onCancel: () => void
  onSave: () => void
  onOverwrite: () => void
  onReload: () => void
}) {
  const { ui, draft, state, disabled } = props
  const set = (index: number, patch: Partial<CheckItem>) =>
    props.onChange(draft.map((item, at) => (at === index ? { ...item, ...patch } : item)))
  const saving = state.state === 'saving'
  return (
    <ui.Group title="编辑清单">
      {draft.map((item, index) => (
        <div className="rc-edit" key={item.id}>
          <ui.TextField
            label={`第 ${index + 1} 项`}
            value={item.title}
            placeholder="版本号已更新"
            maxLength={LIMITS.title}
            disabled={disabled || saving}
            onChange={title => set(index, { title })}
          />
          <ui.TextField
            label="看哪里"
            value={item.where}
            placeholder="package.json"
            maxLength={LIMITS.where}
            disabled={disabled || saving}
            onChange={where => set(index, { where })}
          />
          <ui.Button
            variant="ghost"
            size="xs"
            disabled={disabled || saving}
            onClick={() => props.onChange(draft.filter((_, at) => at !== index))}>
            删除
          </ui.Button>
        </div>
      ))}
      {state.state === 'conflict' ? (
        <ui.Notice
          tone="warn"
          title="清单在别处改过"
          action={
            <>
              <ui.Button variant="ghost" onClick={props.onReload}>
                用那边的
              </ui.Button>
              <ui.Button variant="ghost" onClick={props.onOverwrite}>
                保留我的
              </ui.Button>
            </>
          }
        />
      ) : null}
      {state.state === 'unknown' ? <ui.Notice tone="warn" title="保存结果未知 · 再保存不会存两次" /> : null}
      {state.state === 'failed' ? <ui.Notice tone="error" title="没有保存" /> : null}
      <div className="rc-actions">
        <ui.Button
          disabled={disabled || saving || draft.length >= LIMITS.items}
          onClick={() => props.onChange([...draft, { id: crypto.randomUUID().slice(0, 8), title: '', where: '' }])}>
          添加一项
        </ui.Button>
        <span className="rc-grow" />
        <ui.Button variant="ghost" disabled={saving} onClick={props.onCancel}>
          取消
        </ui.Button>
        <ui.Button variant="primary" loading={saving} disabled={disabled || saving || state.state === 'conflict'} onClick={props.onSave}>
          保存
        </ui.Button>
      </div>
    </ui.Group>
  )
}

/** The latest run: its summary, the reply when it had no block, and the note (saved as it is typed). */
function Outcome(props: {
  ui: PageProps['ui']
  latch: Latch
  run: Doc<Run>
  fresh: boolean
  canWrite: boolean
  scope: string
  tasks: AppTask[]
}) {
  const { ui, latch, run, fresh, canWrite, scope, tasks } = props
  const value = run.value
  const key = RUN_PREFIX + value.sessionId
  const [note, setNote] = useState(value.note)
  const [state, setState] = useState<'saved' | 'dirty' | 'saving' | 'unknown' | 'conflict' | 'failed'>('saved')
  const version = useRef(run.version)
  const pendingWrite = useRef<{ requestId: string; text: string } | undefined>(undefined)
  // A newer copy from elsewhere replaces what is shown unless the person is typing.
  useEffect(() => {
    if (run.version <= version.current && note === value.note) return
    if (state === 'saved') {
      version.current = run.version
      setNote(value.note)
    }
  }, [run.version])

  const save = async (text: string, retry = false) => {
    const write = retry && pendingWrite.current?.text === text ? pendingWrite.current : { requestId: newId(), text }
    pendingWrite.current = write
    setState('saving')
    try {
      const written = await latch.storage.put(
        scope,
        key,
        { ...value, note: text },
        { ifVersion: version.current, requestId: write.requestId },
      )
      version.current = written.version
      pendingWrite.current = undefined
      setState(current => (current === 'saving' ? 'saved' : current))
    } catch (cause) {
      const conflict = versionOf(cause)
      if (conflict !== undefined) setState('conflict')
      else setState(codeOf(cause) === 'unknown' ? 'unknown' : 'failed')
    }
  }
  useEffect(() => {
    if (state !== 'dirty') return undefined
    const timer = setTimeout(() => {
      save(note).catch(() => {})
    }, 800)
    return () => clearTimeout(timer)
  }, [note, state])

  const takeTheirs = async () => {
    const doc = await latch.storage.get(scope, key)
    const latest = readRun(doc?.value)
    if (!doc || !latest) return
    version.current = doc.version
    setNote(latest.note)
    setState('saved')
  }
  const keepMine = async () => {
    const doc = await latch.storage.get(scope, key)
    if (!doc) return
    version.current = doc.version
    await save(note)
  }

  const counts = tally(value.items)
  const failed = value.outcome !== 'completed'
  const summary = value.structured
    ? `${counts.pass} 项通过，${counts.fail} 项没通过${counts.other ? `，${counts.other} 项不确定` : ''}`
    : '没有结构化结果'
  const visible = tasks.some(task => task.id === value.sessionId)
  const status =
    state === 'saving'
      ? '正在保存'
      : state === 'saved' && note
        ? '已保存'
        : state === 'unknown'
          ? '保存结果未知'
          : state === 'failed'
            ? '没有保存'
            : undefined
  const open = visible ? (
    <ui.Button variant="ghost" size="xs" onClick={() => void latch.nav.openSession(value.sessionId).catch(() => {})}>
      打开会话
    </ui.Button>
  ) : null
  if (failed)
    return (
      <ui.Notice tone="error" title="检查没有完成" action={open}>
        检查会话{value.outcome === 'cancelled' ? '被取消了' : value.outcome === 'interrupted' ? '中断了' : '失败了'} · {when(value.finishedAt)}
      </ui.Notice>
    )
  return (
    <>
      <div className="rc-summary">
        <span className="rc-muted">
          {fresh ? '刚刚完成' : `上次检查 · ${when(value.finishedAt)}`} · {summary}
        </span>
        <span className="rc-grow" />
        {open}
      </div>
      {!value.structured && value.reply ? (
        <ui.Group title="回复" action={<ui.Status tone="warn">没有结构化结果</ui.Status>}>
          <pre className="rc-reply">{value.reply}</pre>
        </ui.Group>
      ) : null}
      <ui.TextArea
        label="意见"
        value={note}
        rows={3}
        maxLength={LIMITS.note}
        placeholder="补完 CHANGELOG 再发"
        disabled={!canWrite}
        hint={status}
        onChange={text => {
          setNote(text)
          setState('dirty')
        }}
      />
      {state === 'conflict' ? (
        <ui.Notice
          tone="warn"
          title="意见在别处改过"
          action={
            <>
              <ui.Button variant="ghost" onClick={() => void takeTheirs().catch(() => setState('failed'))}>
                用那边的
              </ui.Button>
              <ui.Button variant="ghost" onClick={() => void keepMine().catch(() => setState('failed'))}>
                保留我的
              </ui.Button>
            </>
          }
        />
      ) : null}
      {state === 'unknown' || state === 'failed' ? (
        <div className="rc-actions">
          <ui.Button variant="ghost" size="xs" disabled={!canWrite} onClick={() => void save(note, true)}>
            重试
          </ui.Button>
        </div>
      ) : null}
    </>
  )
}

export default defineApp({ page: Page })
