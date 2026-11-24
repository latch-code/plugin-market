const MAX_CHECKS = 30
const MAX_LABEL = 240
// A line break or other control character in a label could forge another checklist line in the tool's text.
const CONTROL = /[\p{Cc}\p{Bidi_Control}]/u

/** One release criterion: a trimmed, single-line label of 1–240 characters. */
function label(value) {
  return typeof value === 'string' && value.trim() !== '' && value.length <= MAX_LABEL && !CONTROL.test(value)
}

const record = value => typeof value === 'object' && value !== null && !Array.isArray(value)

export default {
  activate(ctx, config) {
    const configured = record(config) ? config.checks : undefined
    if (!Array.isArray(configured) || !configured.length || configured.length > MAX_CHECKS || !configured.every(label)) {
      throw new Error(`Expected 1–${MAX_CHECKS} release criteria, each a single line of up to ${MAX_LABEL} characters`)
    }
    const checks = configured.map(check => check.trim())
    ctx.registerUiPanel({
      id: 'criteria',
      title: '发布条件',
      listed: false,
      harnessIds: ['standard'],
      render: () => ({ blocks: [{ type: 'list', items: checks }] }),
    })
    ctx.registerTool({
      name: 'summarize_release_checklist',
      title: '汇总发布清单',
      kind: 'think',
      description: 'Summarize user-supplied release criteria. Does not independently verify them or deploy anything.',
      requiresApproval: true,
      parameters: {
        type: 'object',
        properties: {
          checks: {
            type: 'array',
            minItems: 1,
            maxItems: MAX_CHECKS,
            items: {
              type: 'object',
              properties: { label: { type: 'string', minLength: 1, maxLength: MAX_LABEL }, done: { type: 'boolean' } },
              required: ['label', 'done'],
              additionalProperties: false,
            },
          },
        },
        required: ['checks'],
        additionalProperties: false,
      },
      async execute(args, { signal }) {
        signal.throwIfAborted()
        const items = record(args) ? args.checks : undefined
        if (
          !record(args)
          || Object.keys(args).some(key => key !== 'checks')
          || !Array.isArray(items)
          || !items.length
          || items.length > MAX_CHECKS
          || !items.every(
            check =>
              record(check)
              && label(check.label)
              && typeof check.done === 'boolean'
              && Object.keys(check).every(key => key === 'label' || key === 'done'),
          )
        ) {
          throw new Error(
            `Expected 1–${MAX_CHECKS} checks, each with only a single-line label of up to ${MAX_LABEL} characters and a boolean done`,
          )
        }
        const done = items.filter(check => check.done).length
        return {
          text:
            `The user marked ${done} of ${items.length} criteria as done. This summary does not verify them; check the evidence for each.\n`
            + items.map(check => `${check.done ? '[x]' : '[ ]'} ${check.label.trim()}`).join('\n'),
        }
      },
    })
  },
}
