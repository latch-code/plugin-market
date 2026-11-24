/** A standalone ESM component. React and controls come from the workbench; no second React runtime is bundled. */
export default function ReleaseChecklist({ react, ui, session, canCompose, compose, readData }) {
  const { createElement: h, useEffect, useState } = react
  const { Button, Checkbox, TextAreaField, InlineNotice, Loading, StatusPill } = ui
  const [checks, setChecks] = useState(null)
  const [done, setDone] = useState([])
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setError(false)
    readData('criteria', controller.signal)
      .then(({ panel }) => {
        if (controller.signal.aborted) return
        const items = panel.blocks.find(block => block.type === 'list')?.items
        if (!Array.isArray(items)) throw new Error('Missing criteria')
        setChecks(items)
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [session.id, retry])
  if (error)
    return h(
      InlineNotice,
      { tone: 'error', action: h(Button, { onClick: () => setRetry(value => value + 1) }, '重试') },
      '无法读取发布条件。',
    )
  if (!checks) return h(Loading, { label: '正在读取发布条件…' })
  const draft =
    `请核对本次发布的准备情况，逐项列出证据与缺失项。勾选只代表我的标记。\n\n`
    + checks.map((check, index) => `${done.includes(index) ? '[x]' : '[ ]'} ${check}`).join('\n')
    + (notes.trim() ? `\n\n发布说明：\n${notes.trim()}` : '')
  return h(
    'div',
    { className: 'plugin-panel-content' },
    h('div', { className: 'plugin-panel-head' }, h('h2', null, '发布清单'), h(StatusPill, null, `${done.length}/${checks.length}`)),
    h('p', { className: 'plugin-panel-caption' }, '先整理准备情况，再交给当前会话核对。清单保留到面板关闭。'),
    ...checks.map((check, index) =>
      h(Checkbox, {
        key: index,
        label: check,
        checked: done.includes(index),
        onChange: event => {
          const checked = event.currentTarget.checked
          setDone(previous => (checked ? [...previous, index] : previous.filter(item => item !== index)))
        },
      }),
    ),
    h(TextAreaField, {
      label: '发布说明',
      placeholder: '版本、检查结果或仍需确认的事项',
      rows: 4,
      maxLength: 4000,
      value: notes,
      onChange: event => setNotes(event.target.value),
    }),
    h(Button, { variant: 'primary', disabled: !canCompose, onClick: () => compose(draft) }, '写入对话'),
  )
}
