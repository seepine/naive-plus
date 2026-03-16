---
permalink: /form/change
---

# np-form 改变事件

通过 `onChange` 监听值变化。

<demo src="../__demos__/change.vue"></demo>

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| onChange | 改变事件，可通过 `ctx.data` 改变表单值 | `(val:T, ctx: { data:FormData, ... })=>void` | - |
