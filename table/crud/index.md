---
url: /table/crud/index.md
---
# CRUD 增删改查

通过 `api` 配置新增、编辑、删除接口，结合 `formProps` 定义表单字段，即可快速实现完整的增删改查功能。

## 基础用法

在 `columns` 的 `formProps` 中配置表单字段类型，`api` 中提供 `add`、`edit`、`del` 方法即可启用 CRUD。

* 点击「**添加**」按钮弹出新增表单
* 点击行操作「**编辑**」弹出带回填数据的编辑表单
* 点击行操作「**删除**」弹出二次确认弹窗
* `api.add/edit/del` 抛出异常或返回 `false` 时弹窗不关闭

## onBefore 钩子

`operation.onBefore` 在弹窗打开前触发，可用于：

* **阻断操作**：返回 `false` 或抛出异常，弹窗不打开
* **替换数据**：返回新对象，以该对象作为表单初始数据
* **正常打开**：返回 `void` / `undefined` / `true`，按默认逻辑处理

## 类型定义

### formProps

`TableColumn.formProps` 用于配置该列在表单中的展示方式，支持通过 `addProps`、`editProps` 为不同操作模式覆盖配置。

```ts
formProps?: Partial<FormColumn> & {
  addProps?: Partial<FormColumn>   // 新增模式额外配置，会覆盖 formProps
  editProps?: Partial<FormColumn>  // 编辑模式额外配置，会覆盖 formProps
}
```

### operation.onBefore

```ts
onBefore?: (
  rowData: T,
  type: 'add' | 'edit' | 'del'
) => boolean | T | void | Promise<boolean | T | void>
```

| 返回值 | 说明 |
| --- | --- |
| `false` | 阻断操作，弹窗不打开 |
| 抛出异常 | 阻断操作，弹窗不打开 |
| 对象 `T` | 用返回的对象替换表单初始数据 |
| `void` / `undefined` / `true` | 正常打开弹窗 |

### api

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| `add` | 新增接口 | `(rowData: T) => Promise<T \| boolean \| void>` |
| `edit` | 编辑接口 | `(rowData: T) => Promise<T \| boolean \| void>` |
| `del` | 删除接口 | `(rowData: T) => Promise<T \| boolean \| void>` |

> 三个方法均为可选。返回 `false` 或抛出异常时弹窗不关闭；返回其他值则关闭弹窗并刷新表格。
