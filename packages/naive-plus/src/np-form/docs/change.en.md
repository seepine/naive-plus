---
permalink: /en/form/change/
lang: en-US
---

# np-form Change Event

Listen to value changes through `onChange`.

<demo src="../__demos__/change.en.vue"></demo>

## Component Configuration

### FormColumn Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| onChange | Change event. The form value can be modified via `ctx.data` | `(val:T, ctx: { data:FormData, ... })=>void` | - |
