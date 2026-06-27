---
permalink: /form/imperative/
---

# np-form 主动方法

通过 `ref` 获取表单实例后，可主动调用 `submit`、`reset` 与 `validateFields`。

- `submit`：手动触发提交，行为与底部提交按钮一致，会先校验再执行 `onSubmit`。
- `reset`：手动触发重置，行为与底部重置按钮一致，会清空校验并执行 `onReset`。
- `validateFields`：按字段名校验指定字段。

<demo src="../__demos__/imperative.vue"></demo>

## 组件配置

### FormInst methods

| 方法 | 说明 | 类型 |
| ---- | ---- | ---- |
| submit | 主动提交表单 | `() => Promise<void>` |
| reset | 主动重置表单 | `() => Promise<void>` |
| validateFields | 校验指定字段 | `(fields: string \| string[]) => Promise<void>` |
