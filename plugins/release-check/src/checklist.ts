// The release check's data and the two texts it trades with the Agent: the prompt built from the checklist, and the
// fenced `latch-release-check` block it asks for at the end of the reply. No React, no bridge: the page uses these.

/** A line of the checklist: what to check and where to look. */
export interface CheckItem {
  id: string
  title: string
  where: string
}

export type Verdict = 'pass' | 'fail' | 'unknown'

/** One item's outcome in a run; `missing` when the reply's block did not mention it. */
export interface ItemResult {
  id: string
  title: string
  where: string
  status: Verdict | 'missing'
  evidence: string
}

/** A start that has not been settled yet: kept in `plugin` › `pending` before the session is asked for. */
export interface Pending {
  requestId: string
  projectId: string
  projectName: string
  harnessId?: string
  startedAt: string
  /** Known once the start answered; until then `tasks.lookup` finds it. */
  sessionId?: string
  /** The checklist as it was sent, so the reply maps back even if the list changes meanwhile. */
  items: CheckItem[]
}

/** A finished check: `project:<id>` › `runs/<sessionId>`. */
export interface Run {
  sessionId: string
  requestId: string
  projectId: string
  harnessId?: string
  startedAt: string
  finishedAt: string
  outcome: 'completed' | 'failed' | 'cancelled' | 'interrupted'
  /** Whether the reply had a block the page could read. */
  structured: boolean
  items: ItemResult[]
  /** The reply text, kept only when it had no readable block. */
  reply?: string
  note: string
}

export const BLOCK = 'latch-release-check'
export const LIMITS = { items: 30, title: 120, where: 120, evidence: 300, reply: 16_000, note: 4_000 } as const

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const record = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined

/** A checklist as stored (`{ items }`), or no items for anything else. */
export function readChecklist(value: unknown): CheckItem[] {
  const items = record(value)?.items
  if (!Array.isArray(items)) return []
  const seen = new Set<string>()
  const out: CheckItem[] = []
  for (const entry of items) {
    const item = record(entry)
    const id = text(item?.id, 40)
    const title = text(item?.title, LIMITS.title)
    if (!id || !title || seen.has(id)) continue
    seen.add(id)
    out.push({ id, title, where: text(item?.where, LIMITS.where) })
    if (out.length >= LIMITS.items) break
  }
  return out
}

export function readPending(value: unknown): Pending | undefined {
  const pending = record(value)
  if (!pending) return undefined
  const requestId = text(pending.requestId, 64)
  const projectId = text(pending.projectId, 64)
  const startedAt = text(pending.startedAt, 40)
  if (!requestId || !projectId || !startedAt) return undefined
  const harnessId = text(pending.harnessId, 64)
  const sessionId = text(pending.sessionId, 256)
  return {
    requestId,
    projectId,
    projectName: text(pending.projectName, 120) || projectId,
    startedAt,
    items: readChecklist({ items: pending.items }),
    ...(harnessId ? { harnessId } : {}),
    ...(sessionId ? { sessionId } : {}),
  }
}

const OUTCOMES = new Set(['completed', 'failed', 'cancelled', 'interrupted'])
const STATUSES = new Set(['pass', 'fail', 'unknown', 'missing'])

export function readRun(value: unknown): Run | undefined {
  const run = record(value)
  if (!run) return undefined
  const sessionId = text(run.sessionId, 256)
  const startedAt = text(run.startedAt, 40)
  const finishedAt = text(run.finishedAt, 40)
  const outcome = text(run.outcome, 20)
  if (!sessionId || !startedAt || !finishedAt || !OUTCOMES.has(outcome) || !Array.isArray(run.items)) return undefined
  const items: ItemResult[] = []
  for (const entry of run.items) {
    const item = record(entry)
    const status = text(item?.status, 10)
    const id = text(item?.id, 40)
    if (!id || !STATUSES.has(status)) continue
    items.push({
      id,
      title: text(item?.title, LIMITS.title),
      where: text(item?.where, LIMITS.where),
      status: status as ItemResult['status'],
      evidence: text(item?.evidence, LIMITS.evidence),
    })
  }
  const harnessId = text(run.harnessId, 64)
  const reply = typeof run.reply === 'string' ? run.reply.slice(0, LIMITS.reply) : undefined
  return {
    sessionId,
    requestId: text(run.requestId, 64),
    projectId: text(run.projectId, 64),
    startedAt,
    finishedAt,
    outcome: outcome as Run['outcome'],
    structured: run.structured === true,
    items,
    note: typeof run.note === 'string' ? run.note.slice(0, LIMITS.note) : '',
    ...(harnessId ? { harnessId } : {}),
    ...(reply !== undefined ? { reply } : {}),
  }
}

/** The prompt for a check: the numbered list, read-only, and the block the reply must end with. */
export function buildPrompt(items: readonly CheckItem[]): string {
  const lines = items.map((item, index) => `${index + 1}. ${item.title}${item.where ? `（看 ${item.where}）` : ''}`)
  return [
    '请检查这个项目现在能不能发布。逐项核对下面的清单，只读不改：不要修改文件，也不要提交。',
    '',
    ...lines,
    '',
    `回复的最后附一个代码块，语言标记写 ${BLOCK}，内容是一个 JSON 对象：`,
    '{"items": [{"id": 1, "status": "pass", "evidence": "一句话依据"}]}',
    `id 是上面清单的序号（1 到 ${items.length}），每一项都要有；status 只能是 pass（通过）、fail（没通过）或 unknown（查不清）；evidence 写你看到的依据，不超过一句话。`,
  ].join('\n')
}

const FENCE = new RegExp('```' + BLOCK + '[^\\n]*\\n([\\s\\S]*?)\\n?```', 'gu')

/**
 * Reads the last `latch-release-check` block of a reply into one result per item. Undefined when there is no block, it
 * is not JSON, or it names none of the items: the page then shows the reply itself.
 */
export function parseReply(reply: string, items: readonly CheckItem[]): ItemResult[] | undefined {
  let body: string | undefined
  for (const match of reply.matchAll(FENCE)) body = match[1]
  if (body === undefined) return undefined
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return undefined
  }
  const entries = Array.isArray(parsed) ? parsed : record(parsed)?.items
  if (!Array.isArray(entries)) return undefined
  const found = new Map<number, { status: Verdict; evidence: string }>()
  for (const entry of entries) {
    const item = record(entry)
    const index = typeof item?.id === 'number' ? item.id : typeof item?.id === 'string' ? Number(item.id) : NaN
    const status = item?.status
    if (!Number.isInteger(index) || index < 1 || index > items.length || found.has(index)) continue
    if (status !== 'pass' && status !== 'fail' && status !== 'unknown') continue
    found.set(index, { status, evidence: text(item?.evidence, LIMITS.evidence) })
  }
  if (!found.size) return undefined
  return items.map((item, index) => {
    const result = found.get(index + 1)
    return { id: item.id, title: item.title, where: item.where, status: result?.status ?? 'missing', evidence: result?.evidence ?? '' }
  })
}

export function tally(results: readonly ItemResult[]): { pass: number; fail: number; other: number } {
  let pass = 0
  let fail = 0
  for (const result of results) {
    if (result.status === 'pass') pass++
    else if (result.status === 'fail') fail++
  }
  return { pass, fail, other: results.length - pass - fail }
}

/** `11月11日 17:42`, in this device's time zone. */
export function when(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getMonth() + 1}月${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
