---
permalink: /en/table/operation/
lang: en-US
---

# Custom Operation Column

Use the `operation` config to flexibly control the display and behavior of the operation column.

## Hide the Operation Column

Set `operation` to `false` to hide both the operation column and the top "Add" button.

<demo src="../__demos__/operation-hide.en.vue"></demo>

## Prefix and Suffix Slots

Use `prefixRender` and `suffixRender` to insert custom content before and after the default action buttons.

<demo src="../__demos__/operation-render.en.vue"></demo>

## Custom Options and onSelect

Use `options` to configure dropdown menu items, and use `onSelect` to handle clicks on custom items.

- `{ type: 'edit' }` / `{ type: 'del' }` reuses the built-in edit/delete logic (triggers `onBefore`, opens the dialog, etc.)
- Custom `key` options trigger the `onSelect` callback on click

<demo src="../__demos__/operation-custom.en.vue"></demo>

## Types

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

| Field | Description | Type |
| --- | --- | --- |
| `type` | Built-in type, reuses the edit/delete logic | `'edit'` \| `'del'` |
| `key` | Custom option identifier, triggers the `onSelect` callback | `string \| number` |
| `label` | Custom option display label | `string \| (() => VNode)` |

> Built-in types and custom keys can be mixed, e.g. `[{ type: 'edit' }, { type: 'del' }, { key: 'export', label: 'Export' }]`.
