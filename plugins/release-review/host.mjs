export default {
  activate(ctx, config) {
    if (
      !Array.isArray(config.checks)
      || !config.checks.length
      || config.checks.length > 30
      || config.checks.some(check => typeof check !== 'string' || !check.trim() || check.length > 240)
    ) {
      throw new Error('Expected 1–30 release criteria, each up to 240 characters')
    }
    const checks = [...config.checks]
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
            maxItems: 30,
            items: {
              type: 'object',
              properties: { label: { type: 'string' }, done: { type: 'boolean' } },
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
        if (
          Object.keys(args).some(key => key !== 'checks')
          || !Array.isArray(args.checks)
          || args.checks.length > 30
          || args.checks.some(
            check =>
              !check
              || typeof check.label !== 'string'
              || check.label.length > 240
              || typeof check.done !== 'boolean'
              || Object.keys(check).some(key => key !== 'label' && key !== 'done'),
          )
        ) {
          throw new Error('Expected checks with only label and done')
        }
        const done = args.checks.filter(check => check.done).length
        return {
          text:
            `用户标记 ${done}/${args.checks.length} 项完成；尚需核对执行证据。\n`
            + args.checks.map(check => `${check.done ? '[x]' : '[ ]'} ${check.label}`).join('\n'),
        }
      },
    })
  },
}
