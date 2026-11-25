const copy = {
  'zh-CN': {
    unavailable: '当前版本无法提供上下文统计，请更新 Latch。',
    trend: '上下文演变',
    composition: '请求组成',
    textInput: '输入文本 · UTF-8',
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
    first: '首次记录',
    reset: '重新开始上下文',
    running: '进行中',
    failed: '请求失败',
    cancelled: '已取消',
    interrupted: '已中断',
    partial: n => `${n} 个工具定义未计入文本大小。`,
    callsRequested: n => `请求了 ${n} 次工具调用`,
    biggest: '此时占得最多',
    growth: '较上次增长最多',
    reduction: '较上次减少最多',
    net: size => `净变化 ${size}`,
    requestTools: '本次请求的工具结果',
    largest: '最大的工具结果',
    added: '本次新增结果',
    additional: '其余新增结果',
    unnamed: '工具结果',
    viewTool: name => `查看工具输出：${name}`,
    inclusion: {
      new: '本次新增',
      replayed: '已在上次带入',
      unknown: '未知何时首次带入',
    },
    claude: 'Claude SDK 测量',
    breakdown: '窗口组成',
    usedCategories: '已用上下文',
    classified: value => `已分类 ${value}`,
    usedTotal: value => `已用 ${value}`,
    capacityParts: '窗口容量分配',
    capacityTotal: value => `容量 ${value}`,
    usedOther: '其他已用上下文',
    free: '空闲空间',
    buffer: '压缩预留',
    deferred: '延迟加载',
    deferredNote: '未计入窗口占用',
    messageBreakdown: '其中，消息包含',
    messageTotal: value => `消息共 ${value}`,
    unitemized: '未细分',
    providerUsage: '最近一次模型服务用量',
    providerSource: '同一次请求，由 Claude SDK 转报',
    providerInput: '输入 tokens',
    providerOutput: '输出 tokens',
    compaction: '上下文压缩',
    compacted: '已压缩',
    auto: '自动',
    manual: '手动',
    before: '压缩前',
    after: '压缩后',
    compactionDuration: '耗时',
    older: '更早的轮次',
    latestWindow: '回到最新报告',
    windowDelta: value => `较上一轮净变化 ${value}`,
    largestWindowGrowth: '单轮增长最多',
    reportCount: n => `${n} 份报告`,
    compactionStatus: {
      in_progress: '进行中',
      completed: '已完成',
      failed: '失败',
      cancelled: '已取消',
      unknown: '结果未报告',
    },
    categories: {
      system_prompt: '系统提示词',
      system_tools: '内置工具',
      mcp_tools: 'MCP 工具',
      mcp_instructions: 'MCP 指令',
      mcp_tools_deferred: 'MCP 工具（延迟加载）',
      system_tools_deferred: '内置工具（延迟加载）',
      custom_agents: '自定义 Agent',
      memory_files: '记忆文件',
      skills: '技能',
      messages: '消息',
      autocompact_buffer: '自动压缩预留',
      compact_buffer: '压缩预留',
      free_space: '空闲空间',
    },
    messageParts: {
      toolCalls: '工具调用',
      toolResults: '工具结果',
      attachments: '附件',
      assistantMessages: 'Agent 消息',
      userMessages: '用户消息',
      redirectedContext: '重定向上下文',
      unattributed: '未归类',
    },
    window: '上下文窗口',
    noWindow: 'Harness 尚未报告窗口占用。',
    used: '已用',
    capacity: '窗口容量',
    usedOfCapacity: '已用 / 总容量',
    remainingCapacity: '剩余容量',
    overCapacity: '超出容量',
    includesBuffer: '含压缩预留',
    fromHarness: 'Harness 报告',
    configuredWindow: '容量来自模型设置',
    windowHistory: '逐轮窗口占用',
    usedTokens: '已用 tokens',
    turn: n => `第 ${n} 轮`,
    recent: '最近一次模型请求',
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
    callCount: n => `${n} 次`,
    failures: n => `${n} 次失败`,
    longest: time => `单次最长实测 ${time}`,
    more: n => `其余 ${n} 种工具`,
  },
  en: {
    unavailable: 'Context statistics require a newer version of Latch. Update Latch to view them.',
    trend: 'Context history',
    composition: 'Request composition',
    textInput: 'Input text · UTF-8',
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
    first: 'First observation',
    reset: 'Fresh context',
    running: 'In progress',
    failed: 'Request failed',
    cancelled: 'Cancelled',
    interrupted: 'Interrupted',
    partial: (n, count) => `${n} tool ${count === 1 ? 'definition' : 'definitions'} excluded from text size.`,
    callsRequested: (n, count) => `Requested ${n} tool ${count === 1 ? 'call' : 'calls'}`,
    biggest: 'Largest in this request',
    growth: 'Biggest growth vs previous',
    reduction: 'Biggest drop vs previous',
    net: size => `Net change ${size}`,
    requestTools: 'Tool results in this request',
    largest: 'Largest tool results',
    added: 'New tool results',
    additional: 'Other new tool results',
    unnamed: 'Tool result',
    viewTool: name => `View tool output: ${name}`,
    inclusion: {
      new: 'New in this request',
      replayed: 'Already in previous request',
      unknown: 'First inclusion unknown',
    },
    claude: 'Measured by Claude SDK',
    breakdown: 'Window breakdown',
    usedCategories: 'Context in use',
    classified: value => `Classified ${value}`,
    usedTotal: value => `Used ${value}`,
    capacityParts: 'Window capacity allocation',
    capacityTotal: value => `Capacity ${value}`,
    usedOther: 'Other context in use',
    free: 'Free space',
    buffer: 'Compaction buffer',
    deferred: 'Deferred',
    deferredNote: 'Excluded from window usage',
    messageBreakdown: 'Within messages',
    messageTotal: value => `Messages total ${value}`,
    unitemized: 'Not itemized',
    providerUsage: 'Latest provider usage',
    providerSource: 'Same request, as reported by the Claude SDK',
    providerInput: 'Input tokens',
    providerOutput: 'Output tokens',
    compaction: 'Context compaction',
    compacted: 'Compacted',
    auto: 'Automatic',
    manual: 'Manual',
    before: 'Before compaction',
    after: 'After compaction',
    compactionDuration: 'Duration',
    older: 'Earlier turns',
    latestWindow: 'Return to latest report',
    windowDelta: value => `Net change from previous turn ${value}`,
    largestWindowGrowth: 'Largest increase in one turn',
    reportCount: (n, count) => `${n} ${count === 1 ? 'report' : 'reports'}`,
    compactionStatus: {
      in_progress: 'In progress',
      completed: 'Completed',
      failed: 'Failed',
      cancelled: 'Cancelled',
      unknown: 'Outcome not reported',
    },
    categories: {
      system_prompt: 'System prompt',
      system_tools: 'Built-in tools',
      mcp_tools: 'MCP tools',
      mcp_instructions: 'MCP instructions',
      mcp_tools_deferred: 'MCP tools (deferred)',
      system_tools_deferred: 'Built-in tools (deferred)',
      custom_agents: 'Custom agents',
      memory_files: 'Memory files',
      skills: 'Skills',
      messages: 'Messages',
      autocompact_buffer: 'Automatic compaction buffer',
      compact_buffer: 'Compaction buffer',
      free_space: 'Free space',
    },
    messageParts: {
      toolCalls: 'Tool calls',
      toolResults: 'Tool results',
      attachments: 'Attachments',
      assistantMessages: 'Agent messages',
      userMessages: 'User messages',
      redirectedContext: 'Redirected context',
      unattributed: 'Unattributed',
    },
    window: 'Context window',
    noWindow: 'The Harness has not reported window usage.',
    used: 'Used',
    capacity: 'Window capacity',
    usedOfCapacity: 'Used / total capacity',
    remainingCapacity: 'Remaining capacity',
    overCapacity: 'Over capacity',
    includesBuffer: 'Includes compaction reserve',
    fromHarness: 'Reported by Harness',
    configuredWindow: 'Capacity from model settings',
    windowHistory: 'Window usage by turn',
    usedTokens: 'Tokens in use',
    turn: n => `Turn ${n}`,
    recent: 'Latest model request',
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
    callCount: (n, count) => `${n} ${count === 1 ? 'call' : 'calls'}`,
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
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumSignificantDigits: 4 })
  const partPercent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 })
  const signed = new Intl.NumberFormat(locale, { signDisplay: 'exceptZero' })
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
    percent: value => {
      const distanceFromFull = Math.abs(value - 1) * 100
      return distanceFromFull > 0 && distanceFromFull < 0.1
        ? new Intl.NumberFormat(locale, {
            style: 'percent',
            maximumFractionDigits: Math.max(2, Math.ceil(-Math.log10(distanceFromFull))),
          }).format(value)
        : percent.format(value)
    },
    partPercent: ratio => {
      if (ratio > 0 && ratio < 0.001) return `<${partPercent.format(0.001)}`
      if (ratio > 0.999 && ratio < 1) return `>${partPercent.format(0.999)}`
      return partPercent.format(ratio)
    },
    exactBytes: value => `${number.format(value)} B`,
    signedBytes: value => `${signed.format(value)} B`,
    signedTokens: value => `${signed.format(value)} ${Math.abs(value) === 1 ? 'token' : 'tokens'}`,
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
    h(
      env.fragment,
      null,
      request.inputTokens !== undefined
        && h(
          'div',
          { className: 'context-legacy-request-figure' },
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
    ),
  )
}

function windowReading(fmt, used, size) {
  return size > 0 ? `${fmt.number(used)} / ${fmt.tokens(size)}` : fmt.tokens(used)
}

function sourceLabel(t, source) {
  return source === 'claude-sdk' ? t.claude : t.fromHarness
}

function windowUsage(env, report, breakdown) {
  const { h, t, fmt } = env
  const { used, size } = report
  if (used === undefined || !(size > 0)) {
    return countRows(env, [
      [t.used, used === undefined ? t.missing : fmt.tokens(used)],
      [t.capacity, size === undefined ? t.missing : fmt.tokens(size)],
    ])
  }
  const share = used / size
  const percent = fmt.percent(share)
  const value = windowReading(fmt, used, size)
  const remaining = size - used
  const unusedParts = breakdown?.categories.filter(part => part.kind === 'free' || part.kind === 'buffer')
  const includesBuffer = unusedParts?.some(part => part.kind === 'buffer' && part.tokens > 0) && sumParts(unusedParts) === remaining
  return h(
    'div',
    { className: 'context-window-figure' },
    h('div', { className: 'context-window-figures' }, h('strong', null, percent), h('span', null, t.used)),
    h(
      'span',
      {
        className: 'context-window-meter',
        role: 'meter',
        'aria-label': t.window,
        'aria-valuemin': 0,
        'aria-valuemax': size,
        'aria-valuenow': Math.min(used, size),
        'aria-valuetext': `${value} · ${percent}`,
      },
      h('span', { style: { width: `${Math.min(share, 1) * 100}%` } }),
    ),
    countRows(
      env,
      [
        [t.usedOfCapacity, value],
        [
          remaining < 0 ? t.overCapacity : t.remainingCapacity,
          h(env.fragment, null, fmt.tokens(Math.abs(remaining)), includesBuffer && h('small', null, t.includesBuffer)),
        ],
      ],
      'context-window-amounts',
    ),
  )
}

const usedCategoryOrder = [
  'system_prompt',
  'system_tools',
  'mcp_tools',
  'messages',
  'mcp_instructions',
  'custom_agents',
  'memory_files',
  'skills',
  'used',
]
const chartColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']
const partColor = ({ series }) => (series === undefined ? 'var(--faint)' : (chartColors[series] ?? 'var(--faint)'))
const sumParts = parts => sum(parts.map(part => part.tokens))

function categoryParts(categories, t) {
  const totals = new Map()
  for (const { kind, id, tokens } of categories) {
    const key = id ?? kind
    const label = t.categories[id] ?? t[kind === 'used' ? 'usedOther' : kind]
    totals.set(key, { label, tokens: (totals.get(key)?.tokens ?? 0) + tokens, series: usedCategoryOrder.indexOf(key) })
  }
  return [...totals.values()].toSorted((a, b) => a.series - b.series)
}

function windowParts(env, parts, denominator, className = '') {
  const { h, fmt } = env
  return h(
    'div',
    { className: `context-window-parts ${className}` },
    denominator && denominator > 0
      ? h(
          'div',
          { className: 'ui-share' },
          h(
            'div',
            { className: 'context-window-parts-bar', 'aria-hidden': true },
            parts
              .filter(part => part.tokens > 0)
              .map(part =>
                h('span', { key: part.label, style: { width: `${(part.tokens / denominator) * 100}%`, background: partColor(part) } }),
              ),
          ),
          h(
            'ul',
            { className: 'ui-share-parts' },
            parts.map(part =>
              h(
                'li',
                { key: part.label },
                h('i', { className: 'ui-chart-swatch', 'aria-hidden': true, style: { background: partColor(part) } }),
                h('span', { className: 'ui-share-name' }, part.label),
                h('span', { className: 'ui-share-value' }, fmt.tokens(part.tokens)),
                h('span', { className: 'ui-share-percent' }, fmt.partPercent(part.tokens / denominator)),
              ),
            ),
          ),
        )
      : countRows(
          env,
          parts.map(part => [part.label, fmt.tokens(part.tokens)]),
        ),
  )
}

function windowBreakdown(env, { used, size }, breakdown) {
  const { h, t, fmt } = env
  const categories = breakdown.categories
  const usedParts = categoryParts(
    categories.filter(category => category.kind === 'used'),
    t,
  )
  const classified = sumParts(usedParts)
  const usedDenominator = used !== undefined && classified <= used ? used : undefined
  const usedCaption = [
    ...(used === undefined ? [] : [t.usedTotal(fmt.tokens(used))]),
    ...(classified === used ? [] : [t.classified(fmt.tokens(classified))]),
  ].join(' · ')

  const messageCategory = categories.filter(category => category.kind === 'used' && category.id === 'messages')
  const messageTotal = messageCategory.length > 0 ? sum(messageCategory.map(category => category.tokens)) : undefined
  const messageParts = Object.entries(t.messageParts).flatMap(([field, label], series) => {
    const tokens = breakdown.messageBreakdown?.[field]
    return tokens === undefined ? [] : [{ label, tokens, series }]
  })
  const hasMessageParts = messageParts.length > 0
  const itemized = sumParts(messageParts)
  const messageDenominator = messageTotal !== undefined && itemized <= messageTotal ? messageTotal : undefined
  if (messageDenominator !== undefined && itemized < messageDenominator) {
    messageParts.push({ label: t.unitemized, tokens: messageDenominator - itemized })
  }

  const freeParts = categoryParts(
    categories.filter(category => category.kind === 'free'),
    t,
  )
  const bufferParts = categoryParts(
    categories.filter(category => category.kind === 'buffer'),
    t,
  )
  const free = sumParts(freeParts)
  const buffer = sumParts(bufferParts)
  const capacityComplete =
    used !== undefined && size !== undefined && size > 0 && freeParts.length > 0 && bufferParts.length > 0 && used + free + buffer === size
  const capacityParts = capacityComplete
    ? [
        { label: t.used, tokens: used, series: 0 },
        { label: t.free, tokens: free },
        { label: t.buffer, tokens: buffer, series: 1 },
      ]
    : [...freeParts, ...bufferParts]
  const deferredParts = categoryParts(
    categories.filter(category => category.kind === 'deferred'),
    t,
  )
  const provider = breakdown.providerUsage

  return h(
    'section',
    { className: 'context-window-breakdown' },
    h('h3', null, t.breakdown),
    usedParts.length > 0
      && h(
        'div',
        null,
        h('h4', null, t.usedCategories),
        h('p', null, usedCaption),
        windowParts(env, usedParts, usedDenominator, 'context-window-used-parts'),
      ),
    hasMessageParts
      && h(
        'details',
        { className: 'context-window-messages' },
        h('summary', null, t.messageBreakdown),
        messageTotal !== undefined && h('p', null, t.messageTotal(fmt.tokens(messageTotal))),
        windowParts(env, messageParts, messageDenominator, 'context-window-message-parts'),
      ),
    capacityParts.length > 0
      && h(
        'div',
        null,
        h('h4', null, t.capacityParts),
        size !== undefined && h('p', null, t.capacityTotal(fmt.tokens(size))),
        windowParts(env, capacityParts, capacityComplete ? size : undefined, 'context-window-capacity-parts'),
      ),
    deferredParts.length > 0
      && h('div', null, h('h4', null, t.deferred), h('p', null, t.deferredNote), windowParts(env, deferredParts, undefined)),
    provider
      && h(
        'div',
        null,
        h('h4', null, t.providerUsage),
        h('p', null, t.providerSource),
        countRows(
          env,
          [
            [t.providerInput, fmt.number(provider.inputTokens)],
            [t.providerOutput, fmt.number(provider.outputTokens)],
          ],
          'context-window-provider-counts',
        ),
      ),
  )
}
function windowChoices({ h, t, fmt, counted }, rows, chosen, select, resets, completedCompactions) {
  return h(
    'ol',
    { className: 'context-window-choices' },
    rows.map(row => {
      const { turn, window, delta } = row
      const title = h(
        'span',
        { className: 'context-window-turn' },
        counted('turn', turn.number),
        completedCompactions.has(turn.ref) && h('span', { className: 'window-compaction-badge' }, t.compacted),
      )
      return h(
        'li',
        { key: turn.ref },
        resets.has(turn.number) && h('div', { className: 'context-window-reset' }, t.reset),
        window
          ? h(
              'button',
              { type: 'button', className: 'context-window-choice', 'aria-pressed': row === chosen, onClick: () => select(row) },
              title,
              h('span', null, windowReading(fmt, window.used, window.size)),
              window.size > 0
                && h(
                  'span',
                  { className: 'context-window-choice-meter', 'aria-hidden': true },
                  h('span', { style: { width: `${Math.min(window.used / window.size, 1) * 100}%` } }),
                ),
              delta !== undefined && h('small', null, t.windowDelta(fmt.signedTokens(delta))),
            )
          : h('div', { className: 'context-window-missing' }, title, h('span', null, t.missing)),
      )
    }),
  )
}

function compactionHistory(env, events, revealTurn) {
  const { h, ui, t, fmt, counted } = env
  return h(
    'section',
    { className: 'context-compactions' },
    h('h3', null, t.compaction),
    h(
      'ul',
      null,
      events.toReversed().map(({ at, turn, source, status, trigger, beforeTokens, afterTokens, durationMs }, index) => {
        const readings = []
        if (beforeTokens !== undefined) readings.push([t.before, fmt.tokens(beforeTokens)])
        if (afterTokens !== undefined) readings.push([t.after, fmt.tokens(afterTokens)])
        if (durationMs !== undefined) readings.push([t.compactionDuration, fmt.duration(durationMs)])
        return h(
          'li',
          { key: `${at}-${index}` },
          h(
            'div',
            { className: 'context-section-heading' },
            h('strong', null, t.compactionStatus[status]),
            h('time', { dateTime: at }, fmt.time(at)),
          ),
          h(
            'p',
            null,
            [sourceLabel(t, source), ...(trigger ? [t[trigger]] : []), ...(turn ? [counted('turn', turn.number)] : [])].join(' · '),
          ),
          readings.length > 0 && countRows(env, readings),
          turn && revealTurn && h(ui.Button, { variant: 'ghost', onClick: () => revealTurn(turn.ref) }, counted('viewTurn', turn.number)),
        )
      }),
    ),
  )
}

function windowHistory(env, { window: latest, windows, events = [] }, revealTurn, pinned, setPinned) {
  const { h, ui, t, fmt, fragment, counted } = env
  const reports = windows.filter(row => row.window)
  const latestSample = reports.at(-1)
  const pinnedSample = reports.find(row => row.turn.ref === pinned)
  const latestReading = latestSample?.window
  const sameLatest =
    latestReading
    && latest
    && latestReading.at === latest.at
    && latestReading.used === latest.used
    && latestReading.size === latest.size
    && latestReading.source === latest.source
    && latestReading.epoch === latest.epoch
  const chosen = pinnedSample ?? (!latest || sameLatest ? latestSample : undefined)
  const report = pinnedSample?.window ?? latest ?? latestReading
  const focusedTurn = chosen?.turn
  const breakdown = report?.source === 'claude-sdk' ? (chosen?.window?.breakdown ?? report.breakdown) : undefined
  const resets = new Set(events.flatMap(event => (event.kind === 'reset' && event.turn ? [event.turn.number] : [])))
  const compactions = events.filter(event => event.kind === 'compaction')
  const completedCompactions = new Set(compactions.flatMap(event => (event.status === 'completed' && event.turn ? [event.turn.ref] : [])))
  const largestGrowth = reports.reduce((largest, row) => (row.delta > (largest?.delta ?? 0) ? row : largest), undefined)
  const points = windows.flatMap(({ turn, window, delta }, index) => {
    const point = { key: turn.ref, label: fmt.number(turn.number), title: counted('turn', turn.number), value: window?.used }
    return window && windows[index - 1]?.window && delta === undefined ? [{ key: `gap-${turn.ref}`, label: '' }, point] : [point]
  })
  const firstRecent = reports.length > 3 ? Math.max(0, windows.indexOf(reports.at(-3))) : 0
  const choose = row => setPinned(row === latestSample && (!latest || sameLatest) ? undefined : row.turn.ref)
  const selected = rows => windowChoices(env, rows, chosen, choose, resets, completedCompactions)
  const windowSource = report && [sourceLabel(t, report.source), ...(report.configuredSize ? [t.configuredWindow] : [])].join(' · ')
  const showHistory = reports.length > 0 && (windows.length > 1 || (latest && !sameLatest))
  return h(
    fragment,
    null,
    h(
      'section',
      { className: 'context-window-overview' },
      h(
        'header',
        { className: 'context-section-heading' },
        h('h3', null, t.window),
        focusedTurn
          && h(
            'span',
            { className: 'context-window-turn' },
            counted('turn', focusedTurn.number),
            !showHistory && resets.has(focusedTurn.number) && h('span', null, t.reset),
            !showHistory && completedCompactions.has(focusedTurn.ref) && h('span', { className: 'window-compaction-badge' }, t.compacted),
          ),
      ),
      report ? h(fragment, null, windowUsage(env, report, breakdown), reportTime(env, windowSource, report.at)) : h('p', null, t.noWindow),
      ((focusedTurn && revealTurn) || pinnedSample)
        && h(
          'div',
          { className: 'context-window-actions' },
          focusedTurn
            && revealTurn
            && h(ui.Button, { variant: 'ghost', onClick: () => revealTurn(focusedTurn.ref) }, counted('viewTurn', focusedTurn.number)),
          pinnedSample && h(ui.Button, { variant: 'ghost', onClick: () => setPinned(undefined) }, t.latestWindow),
        ),
    ),
    showHistory
      && h(
        'section',
        { className: 'context-window-history' },
        h(
          'header',
          { className: 'context-section-heading' },
          h('h3', null, t.windowHistory),
          h('span', null, counted('reportCount', reports.length)),
        ),
        reports.length >= 3
          && h(
            fragment,
            null,
            h('p', { className: 'window-plot-unit', 'aria-hidden': true }, t.usedTokens),
            h(ui.LineChart, { points, label: t.usedTokens, format: fmt.chartTokens, height: 100 }),
          ),
        largestGrowth
          && h(
            'div',
            { className: 'context-window-growth' },
            h('span', null, t.largestWindowGrowth),
            h(
              ui.Button,
              { variant: 'ghost', onClick: () => (revealTurn ? revealTurn(largestGrowth.turn.ref) : choose(largestGrowth)) },
              counted(revealTurn ? 'viewTurn' : 'turn', largestGrowth.turn.number),
              ' · ',
              fmt.signedTokens(largestGrowth.delta),
            ),
          ),
        firstRecent > 0 && h('details', null, h('summary', null, t.older), selected(windows.slice(0, firstRecent))),
        selected(windows.slice(firstRecent)),
      ),
    report && breakdown && windowBreakdown(env, report, breakdown),
    compactions.length > 0 && compactionHistory(env, compactions, revealTurn),
  )
}

function requestSummary({ h, t, fmt, fragment }, step, previous, values) {
  const largest = Math.max(...values)
  const complete =
    !step.freshContext && previous && previous.sequence + 1 === step.sequence && !step.unmeasuredTools && !previous.unmeasuredTools
  const changes = complete ? requestColumn(previous).values.map((value, index) => values[index] - value) : undefined
  const gain = changes && Math.max(...changes)
  const driver = gain > 0 ? gain : changes && Math.min(...changes)
  const group = changes && driver ? t[seriesKeys[changes.indexOf(driver)]] : undefined
  return h(
    'dl',
    { className: 'context-request-summary' },
    largest > 0
      && h('div', null, h('dt', null, t.biggest), h('dd', null, t[seriesKeys[values.indexOf(largest)]], ' · ', fmt.exactBytes(largest))),
    changes
      && h(
        'div',
        null,
        group && driver
          ? h(
              fragment,
              null,
              h('dt', null, driver > 0 ? t.growth : t.reduction),
              h('dd', null, driver > 0 ? t.grew(group, fmt.exactBytes(driver)) : t.shrank(group, fmt.exactBytes(-driver))),
            )
          : h(fragment, null, h('dt', null, t.change), h('dd', null, t.unchanged)),
        h('dd', { className: 'context-net-change' }, t.net(fmt.signedBytes(sum(changes)))),
      ),
  )
}

function requestToolResults({ h, t, fmt }, contributions, revealTool) {
  if (!contributions) return null
  const { largest } = contributions
  const refs = new Set(largest.flatMap(row => (row.toolRef ? [row.toolRef] : [])))
  const added = contributions.added.filter(row => !row.toolRef || !refs.has(row.toolRef))
  if (!largest.length && !added.length) return null
  const rows = entries =>
    h(
      'ul',
      { className: 'context-tool-result-rows' },
      entries.map(({ bytes, inclusion, name = t.unnamed, toolRef }, index) => {
        const children = [h('bdi', null, name), h('span', null, fmt.exactBytes(bytes), ' · ', t.inclusion[inclusion])]
        return h(
          'li',
          { key: toolRef ?? index },
          toolRef && revealTool
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'context-tool-result-link',
                  'aria-label': t.viewTool(name),
                  onClick: () => revealTool(toolRef),
                },
                ...children,
              )
            : h('div', { className: 'context-tool-result' }, ...children),
        )
      }),
    )
  return h(
    'section',
    { className: 'context-request-tools' },
    h('h3', null, t.requestTools),
    largest.length > 0 && h('div', null, h('h4', null, t.largest), rows(largest)),
    added.length > 0 && h('div', null, h('h4', null, added.length === contributions.added.length ? t.added : t.additional), rows(added)),
  )
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

function requestHistory(env, steps, revealTurn, revealTool, pinned, setPinned) {
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
      h(
        'div',
        { className: 'context-history-figure' },
        h('strong', null, fmt.exactBytes(sum(column.values))),
        h('span', null, t.textInput),
      ),
      (step.freshContext || step.sequence === 1) && h('p', { className: 'context-history-marker' }, step.freshContext ? t.reset : t.first),
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
      requestSummary(env, step, steps[index - 1], column.values),
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
    requestToolResults(env, step.toolContributions, revealTool),
  )
}

function toolActivity(env, { total, failures, groups }) {
  const { h, t, fmt, counted } = env
  const visible = groups.length > 4 ? groups.slice(0, 3) : groups
  const rest = groups.slice(visible.length)
  const restCalls = sum(rest.map(tool => tool.calls))
  const restFailures = sum(rest.map(tool => tool.failed))
  const segments = visible.map((tool, i) => ({ calls: tool.calls, color: chartColors[i] }))
  if (rest.length) segments.push({ calls: restCalls, color: 'var(--faint)' })
  const toolRows = (rows, grouped = false) =>
    h(
      'ul',
      { className: 'context-tool-rows' },
      rows.map((tool, i) => {
        const duration = tool.longestMs >= 1000 ? t.longest(fmt.duration(tool.longestMs)) : ''
        const name = tool.name || t.unknownTool
        return h(
          'li',
          { key: tool.name },
          h('i', { className: 'ui-chart-swatch', 'aria-hidden': true, style: { background: grouped ? 'var(--faint)' : chartColors[i] } }),
          h('bdi', { title: name }, name),
          h('strong', null, counted('callCount', tool.calls)),
          h('span', { className: 'context-tool-share' }, fmt.partPercent(tool.calls / total)),
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
    total > 0
      ? h(
          env.fragment,
          null,
          h(
            'div',
            { className: 'context-tool-composition', 'aria-hidden': true },
            segments.map(({ calls, color }) => h('span', { key: color, style: { width: `${(100 * calls) / total}%`, background: color } })),
          ),
          toolRows(visible),
        )
      : h('p', null, t.noCalls),
    rest.length > 0
      && h(
        'details',
        null,
        h(
          'summary',
          null,
          counted('more', rest.length),
          ' · ',
          counted('callCount', restCalls),
          ' · ',
          fmt.partPercent(restCalls / total),
          restFailures > 0 && h('span', { className: 'context-tool-failed-count' }, ' · ', counted('failures', restFailures)),
        ),
        toolRows(rest, true),
      ),
  )
}

/** The workbench supplies the current session's projected statistics, React and chart controls. */
export default function ContextInsights({ react, ui, locale = 'zh-CN', context, revealTurn, revealTool }) {
  const { createElement: h, Fragment: fragment } = react
  const [pinned, setPinned] = react.useState()
  const [pinnedWindow, setPinnedWindow] = react.useState()
  const t = copy[locale] ?? copy['zh-CN']
  const fmt = formatters(locale)
  const env = { h, ui, t, fmt, fragment, counted: (key, n) => t[key](fmt.number(n), n) }
  // A legacy workbench supplied these optional measurements before it supplied the Harness kind.
  const hasRequests = context?.steps.length > 0 || context?.request !== undefined
  const showWindows =
    context
    && (context.kind === 'harness'
      || !hasRequests
      || context.window
      || context.windows.length
      || context.events?.some(event => event.kind === 'compaction'))
  const fresh = context && context.steps.length === 0 && context.windows.length === 0 && context.freshAt
  return h(
    'div',
    { className: 'context-insights' },
    h('style', null, styles),
    context
      ? h(
          fragment,
          null,
          context.steps.length > 0
            ? requestHistory(env, context.steps, revealTurn, revealTool, pinned, setPinned)
            : context.request && latestRequest(env, context.request),
          showWindows && windowHistory(env, context, revealTurn, pinnedWindow, setPinnedWindow),
          fresh && h('section', null, h('h3', null, t.record), reportTime(env, t.fresh, fresh)),
          toolActivity(env, context.tools),
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
  .context-heading, .context-section-heading, .context-step-nav {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--sp-4) var(--sp-12);
    color: var(--muted);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
  }
  :is(.context-heading, .context-section-heading) { margin-bottom: var(--sp-12); }
  :is(.context-heading, .context-section-heading) h3 { margin: 0; color: var(--ink); }
  .context-history-figure, .context-legacy-request-figure {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--sp-8);
    color: var(--muted);
    font-size: var(--fs-caption);
  }
  .context-history-figure strong, .context-legacy-request-figure strong { color: var(--ink); font-weight: 600; }
  .context-history-figure strong { font-size: var(--fs-hero); line-height: var(--lh-hero); }
  .context-legacy-request-figure strong { font-size: var(--fs-title); }
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
  .context-tool-composition {
    display: flex;
    height: var(--sp-12);
    margin-block: var(--sp-8);
    overflow: hidden;
    border-radius: var(--r-full);
  }
  .context-tool-composition > span + span { box-shadow: inset 1px 0 var(--canvas); }
  .context-tool-rows { margin: 0; padding: 0; list-style: none; }
  .context-tool-rows li {
    display: grid;
    grid-template-columns: var(--sp-8) minmax(0, 1fr) auto minmax(6ch, auto);
    align-items: center;
    gap: var(--sp-2) var(--sp-8);
    padding-block: var(--sp-8);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
  }
  .context-tool-rows li + li { border-top: 1px solid var(--line); }
  .context-tool-rows bdi { overflow-wrap: anywhere; }
  .context-tool-rows strong { font-weight: 600; }
  .context-tool-share { color: var(--muted); text-align: end; }
  .context-tool-rows small { grid-column: 2 / -1; color: var(--muted); font-size: inherit; }
  .context-tool-failed-count { color: var(--red); }
  .context-window-figure {
    display: grid;
    gap: var(--sp-8);
  }
  .context-window-figures {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--sp-4) var(--sp-8);
    color: var(--muted);
    font-size: var(--fs-caption);
  }
  .context-window-figures strong {
    color: var(--ink);
    font-size: var(--fs-hero);
    line-height: var(--lh-hero);
    font-weight: 600;
  }
  .context-window-amounts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--sp-8) var(--sp-12);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    overflow-wrap: anywhere;
  }
  .context-window-amounts dt, .context-window-amounts small {
    color: var(--muted);
    font-size: inherit;
  }
  .context-window-amounts dd {
    margin-top: var(--sp-2);
    color: var(--ink);
    font-weight: 500;
  }
  .context-window-amounts small { display: block; font-weight: 400; }
  .context-window-meter {
    display: block;
    height: var(--sp-12);
    overflow: hidden;
    border-radius: var(--r-full);
    background: var(--track);
  }
  .context-window-meter > span, .context-window-choice-meter > span {
    display: block;
    height: 100%;
    background: var(--chart-1);
  }
  .context-window-choice-meter {
    grid-column: 1 / -1;
    height: var(--sp-4);
    margin-block: var(--sp-2);
    border-radius: var(--r-full);
    overflow: hidden;
    background: var(--track);
  }
  .context-window-growth {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--sp-4) var(--sp-8);
    margin-block: var(--sp-8);
    color: var(--muted);
    font-size: var(--fs-caption);
  }
  .context-window-growth .ui-button {
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  .window-plot-unit {
    padding-bottom: var(--sp-4);
  }
  .context-window-choices,
  .context-compactions ul,
  .context-tool-result-rows {
    display: grid;
    gap: var(--sp-4);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .context-window-choices {
    margin-top: var(--sp-8);
  }
  .context-window-choice,
  .context-window-missing,
  .context-tool-result,
  .context-tool-result-link {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    gap: var(--sp-2) var(--sp-8);
    width: 100%;
    padding: var(--sp-8);
    border: 1px solid transparent;
    border-radius: var(--r-8);
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    text-align: start;
  }
  .context-window-choice,
  .context-tool-result-link {
    cursor: pointer;
  }
  .context-window-choice:hover,
  .context-tool-result-link:hover {
    background: var(--hover);
  }
  .context-window-choice:focus-visible,
  .context-tool-result-link:focus-visible {
    outline: 1px solid var(--ink);
    outline-offset: 2px;
  }
  .context-window-choice[aria-pressed='true'] {
    border-color: var(--line);
    background: var(--hover);
    font-weight: 600;
  }
  .context-window-turn {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--sp-2) var(--sp-6);
  }
  .window-compaction-badge {
    padding-inline: var(--sp-6);
    border-radius: var(--r-6);
    background: var(--sunken);
    color: var(--ink-2);
    font-weight: 500;
    white-space: nowrap;
  }
  .context-window-choice small {
    grid-column: 1 / -1;
    color: var(--muted);
    font-size: inherit;
    font-weight: 400;
  }
  .context-window-missing {
    color: var(--muted);
  }
  .context-window-reset {
    margin-block: var(--sp-8) var(--sp-4);
    border-top: 1px dashed var(--line);
    padding-top: var(--sp-4);
    color: var(--muted);
    font-size: var(--fs-caption);
  }
  .context-window-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-4);
    margin-top: var(--sp-8);
  }
  .context-window-breakdown,
  .context-request-tools {
    display: grid;
    gap: var(--sp-12);
  }
  .context-window-breakdown h3,
  .context-request-tools h3 {
    margin-bottom: 0;
  }
  .context-window-breakdown h4,
  .context-request-tools h4 {
    margin: 0 0 var(--sp-4);
    color: var(--muted);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    font-weight: 500;
  }
  .context-window-breakdown .context-window-messages {
    margin-top: 0;
    padding-inline-start: var(--sp-12);
    border-inline-start: 1px solid var(--line);
  }
  .context-window-parts {
    margin-top: var(--sp-6);
  }
  .context-window-parts-bar {
    display: flex;
    height: var(--sp-8);
    overflow: hidden;
    border-radius: var(--r-full);
    background: var(--track);
  }
  .context-window-parts-bar > span {
    flex: none;
  }
  .context-window-parts-bar > span + span {
    box-shadow: inset 1px 0 var(--canvas);
  }
  .context-window-parts .ui-share-parts > li {
    grid-template-columns: var(--sp-8) minmax(0, 1fr) auto minmax(6ch, auto);
  }
  .context-window-parts .ui-share-name {
    display: block;
    overflow-wrap: anywhere;
    white-space: normal;
  }
  .context-window-provider-counts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--sp-12);
    padding-top: var(--sp-6);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    color: var(--muted);
  }
  .context-window-provider-counts dd {
    color: var(--ink);
    font-size: var(--fs-ui);
    line-height: var(--lh-ui);
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .context-compactions li + li {
    border-top: 1px solid var(--line);
    margin-top: var(--sp-8);
    padding-top: var(--sp-8);
  }
  .context-compactions li .context-section-heading {
    margin-bottom: var(--sp-4);
  }
  .context-compactions li strong {
    color: var(--ink);
  }
  .context-compactions li .ui-button {
    margin-top: var(--sp-4);
  }
  .context-history .context-history-marker {
    margin-block: var(--sp-4) var(--sp-8);
  }
  .context-request-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 135px), 1fr));
    gap: var(--sp-8);
    margin-bottom: var(--sp-12);
  }
  .context-request-summary > div {
    padding: var(--sp-8);
    border: 1px solid var(--line);
    border-radius: var(--r-8);
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
  }
  .context-request-summary dt,
  .context-request-summary .context-net-change {
    color: var(--muted);
    font-weight: 400;
  }
  .context-request-summary dd {
    color: var(--ink);
    font-weight: 600;
  }
  .context-tool-result,
  .context-tool-result-link {
    border-color: var(--line);
    grid-template-columns: minmax(0, 1fr);
    overflow-wrap: anywhere;
  }
  .context-tool-result-link bdi {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .context-tool-result span,
  .context-tool-result-link span {
    color: var(--muted);
  }
}
@media (hover: none) {
  .context-insights .context-history .ui-chart-tip { display: none; }
}
`
