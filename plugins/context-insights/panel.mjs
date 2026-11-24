const copy = {
  'zh-CN': {
    unavailable: '当前版本无法提供上下文统计，请更新 Latch。',
    trend: '上下文演变',
    composition: '请求组成',
    textInput: '输入文本',
    detail: '请求明细',
    instructions: '指令',
    skills: '技能',
    toolSchemas: '工具定义',
    user: '用户消息',
    assistant: 'Agent 消息',
    toolResults: '工具结果',
    guide: '指令与技能',
    conversation: '对话消息',
    images: '图片',
    creator: '含创作指引',
    source: '来源',
    items: '项数',
    bytes: 'UTF-8 字节',
    note: '按提交给模型服务的 UTF-8 文本计量。图片单独计数，token 由模型服务报告。',
    prev: '上一次请求',
    next: '下一次请求',
    latest: '回到最新请求',
    latestMark: '最新',
    viewTurn: n => `查看第 ${n} 轮对话`,
    sequence: n => `第 ${n} 次请求`,
    requests: n => `${n} 次请求`,
    retained: n => `最近 ${n} 次请求`,
    input: '输入 token',
    output: '输出 token',
    duration: '请求耗时',
    missing: '未报告',
    change: '较上次',
    grew: (name, size) => `${name}增加 ${size}`,
    shrank: (name, size) => `${name}减少 ${size}`,
    unchanged: '各来源文本大小与上次相同',
    redistributed: '文本总量与上次相同，来源占比已变化',
    first: '首次记录',
    reset: '重新开始上下文',
    running: '进行中',
    failed: '请求失败',
    cancelled: '已取消',
    interrupted: '已中断',
    partial: n => `${n} 个工具定义未计入文本大小。`,
    callsRequested: n => `请求了 ${n} 次工具调用`,
    window: '上下文窗口',
    noWindow: 'Harness 尚未报告窗口占用。',
    used: '已用',
    capacity: '窗口容量',
    fromHarness: 'Harness 报告',
    configuredWindow: '容量来自模型设置',
    windowHistory: '逐轮窗口占用',
    usedTokens: '已用 tokens',
    turn: n => `第 ${n} 轮`,
    reports: '各轮报告',
    recent: '最近一次模型请求',
    noRequest: '没有可用的请求组成记录。',
    tools: '可用工具',
    messagesCount: n => `${n} 条对话消息`,
    toolsCount: n => `${n} 个可用工具`,
    skillsCount: n => `${n} 项技能`,
    submitted: '已提交给模型服务',
    record: '会话记录',
    fresh: '最近一次重新开始上下文',
    toolActivity: '会话工具调用',
    unknownTool: '未命名工具',
    noCalls: '会话中还没有工具调用记录。',
    calls: n => `共 ${n} 次`,
    failures: n => `${n} 次失败`,
    longest: time => `单次最长实测 ${time}`,
    more: n => `其余 ${n} 种工具`,
  },
  en: {
    unavailable: 'Context statistics require a newer version of Latch. Update Latch to view them.',
    trend: 'Context history',
    composition: 'Request composition',
    textInput: 'Input text',
    detail: 'Request details',
    instructions: 'Instructions',
    skills: 'Skills',
    toolSchemas: 'Tool definitions',
    user: 'User messages',
    assistant: 'Agent messages',
    toolResults: 'Tool results',
    guide: 'Instructions and skills',
    conversation: 'Chat messages',
    images: 'Images',
    creator: 'Creator instructions included',
    source: 'Source',
    items: 'Items',
    bytes: 'UTF-8 bytes',
    note: 'Text sent to the model service is measured in UTF-8 bytes. Images are counted separately. Tokens come from the model service.',
    prev: 'Previous request',
    next: 'Next request',
    latest: 'Return to latest request',
    latestMark: 'Latest',
    viewTurn: n => `View turn ${n} in chat`,
    sequence: n => `Request ${n}`,
    requests: (n, count) => `${n} ${count === 1 ? 'request' : 'requests'}`,
    retained: (n, count) => (count === 1 ? 'Last request' : `Last ${n} requests`),
    input: 'Input tokens',
    output: 'Output tokens',
    duration: 'Request time',
    missing: 'Not reported',
    change: 'vs previous',
    grew: (name, size) => `${name} grew by ${size}`,
    shrank: (name, size) => `${name} fell by ${size}`,
    unchanged: 'Same text size for every source',
    redistributed: 'Same total input size, different source shares',
    first: 'First observation',
    reset: 'Fresh context',
    running: 'In progress',
    failed: 'Request failed',
    cancelled: 'Cancelled',
    interrupted: 'Interrupted',
    partial: (n, count) => `${n} tool ${count === 1 ? 'definition' : 'definitions'} excluded from text size.`,
    callsRequested: (n, count) => `Requested ${n} tool ${count === 1 ? 'call' : 'calls'}`,
    window: 'Context window',
    noWindow: 'The Harness has not reported window usage.',
    used: 'Used',
    capacity: 'Window capacity',
    fromHarness: 'Reported by Harness',
    configuredWindow: 'Capacity from model settings',
    windowHistory: 'Window usage by turn',
    usedTokens: 'Tokens in use',
    turn: n => `Turn ${n}`,
    reports: 'Turn reports',
    recent: 'Latest model request',
    noRequest: 'No request breakdown is available.',
    tools: 'Available tools',
    messagesCount: (n, count) => `${n} chat ${count === 1 ? 'message' : 'messages'}`,
    toolsCount: (n, count) => `${n} available ${count === 1 ? 'tool' : 'tools'}`,
    skillsCount: (n, count) => `${n} ${count === 1 ? 'skill' : 'skills'}`,
    submitted: 'Sent to the model service',
    record: 'Session history',
    fresh: 'Last fresh context',
    toolActivity: 'Tool calls in this chat',
    unknownTool: 'Unnamed tool',
    noCalls: 'No tool calls recorded in this chat yet.',
    calls: (n, count) => `${n} ${count === 1 ? 'call' : 'calls'}`,
    failures: (n, count) => `${n} ${count === 1 ? 'failure' : 'failures'}`,
    longest: time => `Longest measured call ${time}`,
    more: (n, count) => `${n} more ${count === 1 ? 'tool' : 'tools'}`,
  },
}

const sources = [
  ['instructions', 'instructions'],
  ['skills', 'skills', 'skills'],
  ['toolSchemas', 'toolSchemas', 'tools'],
  ['user', 'user', 'userMessages'],
  ['assistant', 'assistant', 'assistantMessages'],
  ['toolResults', 'toolResults', 'toolResults'],
]
const seriesKeys = ['guide', 'toolSchemas', 'conversation', 'toolResults']
const sum = values => values.reduce((total, value) => total + value, 0)

function formatters(locale) {
  const number = new Intl.NumberFormat(locale)
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })
  const percent = new Intl.NumberFormat(locale, { style: 'percent' })
  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return {
    number: value => number.format(value),
    percent: value => percent.format(value),
    time: at => {
      const time = Date.parse(at)
      return Number.isFinite(time) ? date.format(time) : ''
    },
    bytes: n => {
      if (n < 1000) return `${number.format(n)} B`
      if (n < 1000000) return `${decimal.format(n / 1000)} kB`
      return `${decimal.format(n / 1000000)} MB`
    },
    tokens: n => `${number.format(n)} ${n === 1 ? 'token' : 'tokens'}`,
    chartTokens: n => {
      if (n < 1000) return number.format(n)
      if (n < 1000000) return `${decimal.format(n / 1000)}k`
      return `${decimal.format(n / 1000000)}M`
    },
    duration: ms => {
      if (ms < 1000) return `${number.format(ms)} ms`
      if (ms < 60000) return `${decimal.format(ms / 1000)} s`
      const seconds = Math.floor(ms / 1000)
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
      return `${Math.floor(seconds / 3600)}h ${Math.floor(seconds / 60) % 60}m`
    },
  }
}

function reportTime({ h, fmt }, label, at) {
  return h('p', { className: 'context-report-time' }, label, ' · ', h('time', { dateTime: at }, fmt.time(at)))
}

function countRows({ h }, entries, className = 'context-counts') {
  return h(
    'dl',
    { className },
    entries.map(([label, value]) => h('div', { key: label }, h('dt', null, label), h('dd', null, value))),
  )
}

function latestRequest(env, request) {
  const { h, t, fmt, counted } = env
  return h(
    'section',
    null,
    h('h3', null, t.recent),
    request
      ? h(
          env.fragment,
          null,
          request.inputTokens !== undefined
            && h(
              'div',
              { className: 'context-window-figure' },
              h('strong', null, fmt.tokens(request.inputTokens)),
              h('span', null, t.input),
            ),
          h(
            'p',
            null,
            [
              counted('messagesCount', request.userMessages + request.assistantMessages),
              counted('toolsCount', request.tools),
              ...(request.skills ? [counted('skillsCount', request.skills)] : []),
            ].join(' · '),
          ),
          reportTime(env, t.submitted, request.at),
          h(
            'details',
            { className: 'context-request-details' },
            h('summary', null, t.detail),
            countRows(
              env,
              sources
                .slice(1)
                .map(([label, , key]) => [key === 'tools' ? t.tools : t[label], fmt.number(request[key])])
                .concat([[t.images, fmt.number(request.images)]]),
            ),
            request.creator && h('p', null, t.creator),
          ),
        )
      : h('p', null, t.noRequest),
  )
}

function windowUsage(env, report) {
  const { h, ui, t, fmt } = env
  const { used, size } = report ?? {}
  const measured = used !== undefined || size !== undefined
  const windowValue = used !== undefined && size > 0 ? `${fmt.number(used)} / ${fmt.tokens(size)}` : undefined
  return h(
    'section',
    null,
    h('h3', null, t.window),
    windowValue
      ? h(
          'div',
          { className: 'context-window-figure' },
          h('strong', null, fmt.percent(Math.min(1, used / size))),
          h(ui.Meter, { label: t.window, value: used, max: size, valueText: windowValue, size: 'md' }),
          h('span', { className: 'context-window-value' }, windowValue),
        )
      : measured
        ? countRows(env, [
            [t.used, used === undefined ? t.missing : fmt.tokens(used)],
            [t.capacity, size === undefined ? t.missing : fmt.tokens(size)],
          ])
        : h('p', null, t.noWindow),
    measured && reportTime(env, report.configuredSize ? t.configuredWindow : t.fromHarness, report.at),
  )
}

function windowHistory(env, windows) {
  const { h, ui, t, fmt, counted } = env
  if (windows.filter(item => item.window).length < 2) return null
  const points = windows.map(({ turn, window }) => ({
    key: turn.ref,
    label: fmt.number(turn.number),
    title: counted('turn', turn.number),
    ...(window
      ? {
          value: window.used,
          note: [fmt.time(window.at), ...(window.size ? [`${fmt.number(window.used)} / ${fmt.tokens(window.size)}`] : [])].join(' · '),
        }
      : {}),
  }))
  return h(
    'section',
    { className: 'context-window-history' },
    h('h3', null, t.windowHistory),
    h(ui.LineChart, { points, label: t.usedTokens, format: fmt.chartTokens, height: 100 }),
    h(
      'details',
      null,
      h('summary', null, t.reports),
      countRows(
        env,
        points.map(point => [point.title, point.value === undefined ? t.missing : fmt.tokens(point.value)]),
      ),
    ),
  )
}

function requestChange({ h, t, fmt }, step, previous) {
  if (!previous || previous.sequence + 1 !== step.sequence || step.unmeasuredTools || previous.unmeasuredTools) {
    return step.freshContext ? t.reset : step.sequence === 1 ? t.first : null
  }
  const changes = sources.map(([label, field]) => ({ label: t[label], amount: step.bytes[field] - previous.bytes[field] }))
  const delta = sum(changes.map(change => change.amount))
  const prefix = step.freshContext ? `${t.reset} · ` : ''
  if (delta === 0) return prefix + (changes.some(change => change.amount) ? t.redistributed : t.unchanged)
  const direction = Math.sign(delta)
  const driver = changes.reduce((largest, item) => (item.amount * direction > largest.amount * direction ? item : largest))
  const why = delta > 0 ? t.grew(driver.label, fmt.bytes(driver.amount)) : t.shrank(driver.label, fmt.bytes(-driver.amount))
  return h('span', null, prefix, h('b', null, `${delta > 0 ? '+' : '−'}${fmt.bytes(Math.abs(delta))}`), ` ${t.change} · ${why}`)
}

function requestDetails({ h, t, fmt }, step) {
  const row = (label, count, bytes) => h('tr', { key: label }, h('th', { scope: 'row' }, label), h('td', null, count), h('td', null, bytes))
  return h(
    'details',
    { className: 'context-request-details' },
    h('summary', null, t.detail),
    h(
      'table',
      null,
      h(
        'thead',
        null,
        h(
          'tr',
          null,
          [t.source, t.items, t.bytes].map(label => h('th', { key: label, scope: 'col' }, label)),
        ),
      ),
      h(
        'tbody',
        null,
        sources.map(([label, field, count]) => row(t[label], count ? fmt.number(step[count]) : '—', fmt.number(step.bytes[field]))),
        row(t.images, fmt.number(step.images), '—'),
      ),
    ),
    h('p', null, t.note, step.creator && ` · ${t.creator}`),
  )
}

function requestColumn(step, title) {
  const { sequence, bytes } = step
  return {
    key: String(sequence),
    label: String(sequence),
    title,
    values: [bytes.instructions + bytes.skills, bytes.toolSchemas, bytes.user + bytes.assistant, bytes.toolResults],
  }
}

function requestHistory(env, steps, revealTurn, pinned, setPinned) {
  const { h, ui, t, fmt, fragment, counted } = env
  const last = steps.length - 1
  const selectedIndex = pinned === undefined ? last : steps.findIndex(step => step.sequence === pinned)
  const index = selectedIndex === -1 ? last : selectedIndex
  const step = steps[index]
  const columns = steps.map(item => requestColumn(item, counted('sequence', item.sequence)))
  const column = columns[index]
  const series = seriesKeys.map(key => t[key])
  const select = target => setPinned(target === last ? undefined : steps[target].sequence)
  const navButton = (label, glyph, disabled, onClick) =>
    h(
      ui.Button,
      {
        variant: 'ghost',
        size: 'sm',
        disabled,
        onClick,
        'aria-label': label,
      },
      h('span', { 'aria-hidden': true }, glyph),
    )
  const move = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const buttons = Array.from(event.currentTarget.querySelectorAll('g[role="button"]'))
    const focused = buttons.indexOf(event.target)
    if (focused === -1) return
    event.preventDefault()
    const target = { Home: 0, End: last, ArrowLeft: Math.max(0, focused - 1), ArrowRight: Math.min(last, focused + 1) }[event.key]
    select(target)
    buttons[target]?.focus()
  }
  const change = requestChange(env, step, steps[index - 1])
  const status = [t[step.status], step.toolCalls ? counted('callsRequested', step.toolCalls) : undefined].filter(Boolean).join(' · ')
  return h(
    fragment,
    null,
    h(
      'section',
      { className: 'context-history' },
      h(
        'header',
        { className: 'context-heading' },
        h('h3', null, t.trend),
        h('span', null, counted(steps[0].sequence > 1 ? 'retained' : 'requests', steps.length)),
      ),
      h('div', { className: 'context-history-figure' }, h('strong', null, fmt.bytes(sum(column.values))), h('span', null, t.textInput)),
      h('p', { className: 'context-history-delta' }, change),
      h(
        'div',
        { onKeyDown: move },
        h(ui.BarChart, {
          label: t.trend,
          columns,
          series,
          selected: column.key,
          format: fmt.bytes,
          height: 128,
          onSelect: key => select(key === undefined ? last : columns.findIndex(item => item.key === key)),
        }),
      ),
      h(
        'div',
        { className: 'context-step-nav' },
        h(
          'div',
          { className: 'context-step-selector' },
          navButton(t.prev, '‹', index === 0, () => select(index - 1)),
          h('span', { 'aria-live': 'polite' }, column.title),
          navButton(t.next, '›', index === last, () => select(index + 1)),
        ),
        index < last ? h(ui.Button, { variant: 'ghost', onClick: () => select(last) }, t.latest) : h('span', null, t.latestMark),
      ),
    ),
    h(
      'section',
      { 'aria-label': t.composition, className: 'context-composition' },
      h('header', { className: 'context-heading' }, h('h3', null, t.composition), h('time', { dateTime: step.at }, fmt.time(step.at))),
      h(ui.ShareBar, {
        label: t.composition,
        parts: seriesKeys.map((key, part) => ({ key, label: t[key], name: t[key], value: column.values[part] })),
        format: fmt.bytes,
      }),
      step.unmeasuredTools > 0 && h('p', { className: 'context-request-note' }, counted('partial', step.unmeasuredTools)),
      countRows(
        env,
        [
          [t.input, step.inputTokens === undefined ? t.missing : fmt.number(step.inputTokens)],
          [t.output, step.outputTokens === undefined ? t.missing : fmt.number(step.outputTokens)],
          [t.duration, step.durationMs === undefined ? (step.status === 'running' ? t.running : t.missing) : fmt.duration(step.durationMs)],
        ],
        'context-metrics',
      ),
      status && h('p', { className: 'context-request-note' }, status),
      h(
        'div',
        { className: 'context-request-actions' },
        requestDetails(env, step),
        step.turn
          && revealTurn
          && h(ui.Button, { variant: 'ghost', onClick: () => revealTurn(step.turn.ref) }, counted('viewTurn', step.turn.number)),
      ),
    ),
  )
}

function toolActivity(env, { total, failures, groups }) {
  const { h, t, fmt, counted } = env
  const width = value => `${(100 * value) / total}%`
  const toolRows = rows =>
    h(
      'ul',
      { className: 'context-tool-rows' },
      rows.map(tool => {
        const duration = tool.longestMs >= 1000 ? t.longest(fmt.duration(tool.longestMs)) : ''
        const name = tool.name || t.unknownTool
        return h(
          'li',
          { key: tool.name },
          h('bdi', { title: name }, name),
          h(
            'span',
            { className: 'context-tool-track', 'aria-hidden': true },
            h('i', { style: { width: width(tool.calls - tool.failed) } }),
            tool.failed > 0 && h('i', { className: 'context-tool-failure', style: { width: width(tool.failed) } }),
          ),
          h('span', null, fmt.number(tool.calls)),
          (tool.failed > 0 || duration)
            && h(
              'small',
              null,
              tool.failed > 0 && h('span', { className: 'context-tool-failed-count' }, counted('failures', tool.failed)),
              tool.failed > 0 && duration && ' · ',
              duration,
            ),
        )
      }),
    )
  return h(
    'section',
    { className: 'context-tool-activity' },
    h(
      'header',
      { className: 'context-heading' },
      h('h3', null, t.toolActivity),
      total > 0 && h('span', null, counted('calls', total), failures > 0 && ` · ${counted('failures', failures)}`),
    ),
    total > 0 ? toolRows(groups.slice(0, 3)) : h('p', null, t.noCalls),
    groups.length > 3 && h('details', null, h('summary', null, counted('more', groups.length - 3)), toolRows(groups.slice(3))),
  )
}

/** The workbench supplies the current session's projected statistics, React and chart controls. */
export default function ContextInsights({ react, ui, locale = 'zh-CN', context, revealTurn }) {
  const { createElement: h, Fragment: fragment } = react
  const [pinned, setPinned] = react.useState()
  const t = copy[locale] ?? copy['zh-CN']
  const fmt = formatters(locale)
  const env = { h, ui, t, fmt, fragment, counted: (key, n) => t[key](fmt.number(n), n) }
  const windows = context && h(fragment, null, windowUsage(env, context.window), windowHistory(env, context.windows))
  return h(
    'div',
    { className: 'context-insights' },
    h('style', null, styles),
    context
      ? h(
          fragment,
          null,
          context.steps.length ? requestHistory(env, context.steps, revealTurn, pinned, setPinned) : windows,
          context.steps.length === 0 && latestRequest(env, context.request),
          toolActivity(env, context.tools),
          context.steps.length > 0 && windows,
          context.freshAt && h('section', null, h('h3', null, t.record), reportTime(env, t.fresh, context.freshAt)),
        )
      : h('p', null, t.unavailable),
  )
}

const styles = `
.context-insights {
  display: grid;
  align-content: start;
  gap: var(--sp-20);
  padding: var(--sp-16);
  font-variant-numeric: tabular-nums;
  color: var(--ink);

  > section { min-width: 0; }
  > section + section { padding-top: var(--sp-16); border-top: 1px solid var(--line); }
  h3 { margin: 0 0 var(--sp-8); font-size: var(--fs-heading); font-weight: 600; line-height: var(--lh-heading); }
  :where(p) { margin: 0; color: var(--muted); font-size: var(--fs-caption); line-height: var(--lh-caption); }
  :where(dl, dd) { margin: 0; }
  details { margin-top: var(--sp-8); }
  summary {
    width: fit-content;
    padding-block: var(--sp-6);
    color: var(--ink-2);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    cursor: pointer;
  }
  summary:hover { color: var(--ink); }
  summary:focus-visible { outline: 1px solid var(--ink); outline-offset: 2px; }
  .context-heading, .context-step-nav {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--sp-4) var(--sp-12);
    color: var(--muted);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
  }
  .context-heading { margin-bottom: var(--sp-12); }
  .context-heading h3 { margin: 0; color: var(--ink); }
  .context-history-figure, .context-window-figure {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--sp-8);
    color: var(--muted);
    font-size: var(--fs-caption);
  }
  .context-history-figure strong, .context-window-figure strong { color: var(--ink); font-weight: 600; }
  .context-history-figure strong { font-size: var(--fs-hero); line-height: var(--lh-hero); }
  .context-window-figure strong { font-size: var(--fs-title); }
  .context-history-delta { min-height: var(--lh-caption); margin-block: var(--sp-4) var(--sp-12); }
  .context-history-delta b { color: var(--ink-2); font-weight: 500; }
  .context-window-value { flex-basis: 100%; }
  .context-step-nav { margin-top: var(--sp-6); }
  .context-step-selector { display: inline-flex; align-items: center; gap: var(--sp-4); color: var(--ink-2); }
  .context-step-selector button > span { font-size: var(--fs-title); }
  .context-counts > div {
    display: flex;
    justify-content: space-between;
    gap: var(--sp-12);
    padding-block: var(--sp-6);
    border-bottom: 1px solid var(--line);
    font-size: var(--fs-ui);
    line-height: var(--lh-ui);
  }
  .context-counts dt { color: var(--ink-2); }
  .context-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--sp-8); margin-top: var(--sp-16); }
  .context-metrics dt { color: var(--muted); font-size: var(--fs-caption); line-height: var(--lh-caption); }
  .context-metrics dd { margin-top: var(--sp-4); font-size: var(--fs-ui); line-height: var(--lh-ui); font-weight: 500; overflow-wrap: anywhere; }
  .context-composition .ui-share-parts { gap: var(--sp-6); }
  .context-composition .ui-share-percent { color: var(--ink-2); }
  .context-report-time, .context-request-note { margin-top: var(--sp-8); }
  .context-request-actions { display: flex; justify-content: space-between; align-items: baseline; gap: var(--sp-4) var(--sp-12); flex-wrap: wrap; }
  .context-request-actions > details[open] { flex-basis: 100%; }
  table { width: 100%; border-collapse: collapse; margin: var(--sp-4) 0 var(--sp-8); font-size: var(--fs-caption); }
  :is(td, th) { padding: var(--sp-4) var(--sp-6); text-align: end; font-weight: 400; border-bottom: 1px solid var(--line); }
  :is(td, th):first-child { padding-inline-start: 0; text-align: start; }
  :is(td, th):last-child { padding-inline-end: 0; }
  thead { color: var(--muted); }
  .context-tool-rows { display: grid; gap: var(--sp-6); margin: 0; padding: 0; list-style: none; }
  .context-tool-rows li {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(2ch, auto);
    gap: 0 var(--sp-12);
    align-items: center;
    font-size: var(--fs-caption);
  }
  .context-tool-rows bdi { overflow-wrap: anywhere; }
  .context-tool-rows li > span:last-of-type { text-align: end; }
  .context-tool-rows small { grid-column: 1 / -1; color: var(--muted); }
  .context-tool-failed-count { color: var(--red); }
  .context-tool-track { display: flex; height: var(--sp-4); overflow: hidden; border-radius: var(--r-full); background: var(--track); }
  .context-tool-track i { background: var(--meter); }
  .context-tool-track .context-tool-failure { background: var(--red); }
}
@media (hover: none) {
  .context-insights .context-history .ui-chart-tip { display: none; }
}
`
