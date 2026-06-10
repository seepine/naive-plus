---
permalink: /table/operation/
---

# 自定义操作列

通过 `operation` 配置项灵活控制操作列的显示与行为。

## 隐藏操作列

将 `operation` 设为 `false`，同时隐藏操作列和顶部「添加」按钮。

<demo src="../__demos__/operation-hide.vue"></demo>

## 前后插槽

通过 `prefixRender` 和 `suffixRender` 在默认操作按钮的前后插入自定义内容。

<demo src="../__demos__/operation-render.vue"></demo>

## 自定义选项与 onSelect

通过 `options` 配置下拉菜单选项，使用 `onSelect` 处理自定义项的点击事件。

- `{ type: 'edit' }` / `{ type: 'del' }` 会复用内置的编辑/删除逻辑（触发 `onBefore`、弹窗等）
- 自定义 `key` 的选项点击后触发 `onSelect` 回调

<demo src="../__demos__/operation-custom.vue"></demo>

## 类型定义

### operation

```ts
operation?:
  | false
  | {
      label?: string
      width?: number | string
      prefixRender?: (rowData: T, rowIndex: number) => VNode
      suffixRender?: (rowData: T, rowIndex: number) => VNode
      options?: TableOperationOption[]
      onSelect?: (key: string) => void | boolean
      onBefore?: (rowData: T, type: 'add' | 'edit' | 'del') => boolean | T | void | Promise<...>
    }
```

### TableOperationOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `type` | 使用内置类型，复用编辑/删除逻辑 | `'edit'` \| `'del'` |
| `key` | 自定义选项标识，触发 `onSelect` 回调 | `string \| number` |
| `label` | 自定义选项显示文字 | `string \| (() => VNode)` |

> 可同时混合内置 type 与自定义 key，例如 `[{ type: 'edit' }, { type: 'del' }, { key: 'export', label: '导出' }]`。
