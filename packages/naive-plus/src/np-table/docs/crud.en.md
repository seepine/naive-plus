---
permalink: /en/table/crud/
lang: en-US
---

# CRUD (Create, Read, Update, Delete)

By configuring `api` with add, edit, and delete methods and using `formProps` to define the form fields, you can quickly build a complete CRUD feature.

## Basic Usage

Configure the form field types in the column `formProps`, and provide `add`, `edit`, `del` methods in `api` to enable CRUD.

- Click the **Add** button to open the create form
- Click the **Edit** action to open the edit form with the row data prefilled
- Click the **Delete** action to open a confirmation dialog
- If `api.add/edit/del` throws an error or returns `false`, the dialog will not close

<demo src="../__demos__/crud.en.vue"></demo>

## onBefore Hook

`operation.onBefore` is triggered before the dialog opens, and can be used to:

- **Block the action**: return `false` or throw an error, the dialog will not open
- **Replace data**: return a new object, which will be used as the initial form data
- **Open normally**: return `void` / `undefined` / `true`, default behavior

<demo src="../__demos__/crud-on-before.en.vue"></demo>

## Types

### formProps

`TableColumn.formProps` is used to configure how a column is displayed in the form. You can override the config for different action modes via `addProps` and `editProps`.

```ts
formProps?: Partial<FormColumn> & {
  addProps?: Partial<FormColumn>   // Extra config for the add mode, overrides formProps
  editProps?: Partial<FormColumn>  // Extra config for the edit mode, overrides formProps
}
```

### operation.onBefore

```ts
onBefore?: (
  rowData: T,
  type: 'add' | 'edit' | 'del'
) => boolean | T | void | Promise<boolean | T | void>
```

| Return | Description |
| --- | --- |
| `false` | Block the action, the dialog will not open |
| Thrown error | Block the action, the dialog will not open |
| Object `T` | Use the returned object as the initial form data |
| `void` / `undefined` / `true` | Open the dialog normally |

### api

| Method | Description | Type |
| --- | --- | --- |
| `add` | Create API | `(rowData: T) => Promise<T \| boolean \| void>` |
| `edit` | Update API | `(rowData: T) => Promise<T \| boolean \| void>` |
| `del` | Delete API | `(rowData: T) => Promise<T \| boolean \| void>` |

> All three methods are optional. If they return `false` or throw an error, the dialog will not close; otherwise, the dialog closes and the table refreshes.
