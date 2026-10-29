---
permalink: /en/components/np-config-provider/
lang: en-US
---

# NpConfigProvider

Global defaults for components, used to change the default value of component props in one place.

Priority: **component prop > NpConfigProvider > component built-in default**.

## Basic Usage

Use `component-options` to set default props of components. The key is the component name (PascalCase without the `Np` prefix).

<demo src="../__demos__/basic.en.vue"></demo>

## Props

| Name | Description | Type | Default |
| ---------------- | ---------------------------------------------- | ------------------- | ------- |
| componentOptions | Default props overrides of components | `NpComponentOptions` | - (inherited from the outer provider; treated as `{}` without one) |
| locale | Language of the built-in texts, supports the built-in `'zh'` / `'en'` and a custom locale messages object; inherited from the outer `NpConfigProvider` when omitted | `NpLocaleOption` (`'zh' \| 'en' \| NpLocaleMessagesInput`) | `'zh'` (without outer provider) |

## NpComponentOptions

Only display-related props are exposed (`Button` is the exception: all props except `click` / `onClick` are configurable; `Form`'s `column.props` is passed through per control type). The configurable fields of each component are listed below, and every type is defined and exported by the component itself.

| Name | Configurable | Type |
| ---------- | ------------------------------------------ | ------------------------ |
| Button | All props except `click` / `onClick` | `NpButtonConfigProps` |
| Cell | `hover` / `arrow` / `bordered` / `size` | `NpCellConfigProps` |
| CellGroup | `size` / `bordered` | `NpCellGroupConfigProps` |
| Checkbox | `loadingDelay` / `props` | `NpCheckboxConfigProps` |
| Radio | `type` / `loadingDelay` / `props` | `NpRadioConfigProps` |
| Upload | `props` | `NpUploadConfigProps` |
| Filter | `trigger` / `placement` | `NpFilterConfigProps` |
| Form | `enterSubmitMode` / `grid` / `props` / `column` / `footer` | `NpFormConfigProps` |
| Table | `rowKey` / `props` / `formProps` / `column` / `operation` | `NpTableConfigProps` |

### NpFormConfigProps

| Name | Description | Type |
| ---------------- | ------------------------------- | ------------------------------- |
| enterSubmitMode | Enter-to-submit mode | `'last' \| 'all' \| false` |
| grid | Grid layout config | `Partial<GridProps>` |
| props | Props passed to `n-form` | `FormOption['props']` |
| column | Defaults of each form item | `NpFormColumnConfigProps` |
| column.props | Default control props, choose valid ones by `type` | `AnyObject` |
| column.formItemProps | Default form item props | `FormGridItemProps` |
| footer | Defaults of the form footer | `NpFormFooterConfigProps` |

### NpFormFooterConfigProps

| Name | Description | Type |
| ---------------- | --------------------------------------------- | ---------------------- |
| formItemProps | Props of the footer form item, `span` controls its grid span | `FormGridItemProps` |
| style | Style of the footer content container | `CSSProperties` |
| align | Footer alignment, validation feedback aligns right when `right` | `'left' \| 'right'` |
| submitErrorFeedback | Whether to show the submit error in the footer feedback | `boolean` |
| submitBtn | Submit button config, `false` to hide it | `false \| { text?, props? }` |
| resetBtn | Reset button config, `false` to hide it | `false \| { text?, props? }` |

### NpTableConfigProps

| Name | Description | Type |
| -------------------- | ---------------------------------------- | --------------------------- |
| rowKey | Row key field name | `string` |
| props | Props passed to `n-data-table` | `TableOption['props']` |
| formProps | Props of the form inside the CRUD dialog | `FormOption['props']` |
| column | Defaults of each column | `NpTableColumnConfigProps` |
| column.props | Default naive-ui column props (`children` excluded, it belongs to the column structure) | `Omit<TableColumn['props'], 'children'>` |
| column.formProps | Default form props of the CRUD dialog column, without content / data source / data contract / state / event fields | `NpTableColumnFormConfigProps` |
| column.formProps.addProps | Default form props for the add dialog, same-name fields take priority over `column.formProps` | `NpTableColumnFormConfigProps['addProps']` |
| column.formProps.editProps | Default form props for the edit dialog, same-name fields take priority over `column.formProps` | `NpTableColumnFormConfigProps['editProps']` |
| operation | Defaults of the operation column | `NpTableOperationConfigProps` |

### NpTableOperationConfigProps

| Name | Description | Type |
| -------------------- | -------------------------------------------------------------- | --------------------------- |
| label | Title of the operation column, defaults to `Table.operation.label` in the locale | `string` |
| defaultOptions | Default config of the built-in edit / delete items, merged into the built-in defaults item by item | `TableOperationDefaultOptions` |
| others | `NTableColumn` props except `key` / `title` / `render` / `type` (e.g. `width` / `align` / `fixed` / `ellipsis`), used as the defaults of the operation column | `Omit<NTableColumn<T>, 'key' \| 'title' \| 'render' \| 'type'>` |

> The same config in `option.operation` takes priority; `option.operation: false` still hides the whole operation column.

## Locale

Use `locale` to change the texts hard-coded inside components. The built-in `'zh'` (default) and `'en'` are supported, and a custom locale messages object (`NpLocaleMessagesInput`) can be passed directly to support any language.

<demo src="../__demos__/locale.en.vue"></demo>

Structure of the locale messages (`NpLocaleMessages`):

| Field | Description | Chinese default |
| ------------------------------------ | ------------------------------------------- | ---------------------------------------- |
| Form.footer.submitBtnText | Submit button text | `提交` |
| Form.footer.resetBtnText | Reset button text | `重置` |
| Form.uploadPendingTip | Validation message when the file upload is not finished | `文件上传未完成` |
| Upload.uploadFailedTip | Prefix of the upload failure message | `上传失败` |
| Upload.unknownError | Text shown when the upload error has no message | `未知错误` |
| Upload.uploadBtnText | Text of the default upload button | `上传文件` |
| Filter.clearAllText | Text of the clear-all-filters item | `清除所有筛选` |
| Table.operation.label | Title of the operation column | `操作` |
| Table.operation.editLabel | Text of the edit item | `编辑` |
| Table.operation.delLabel | Text of the delete item | `删除` |
| Table.display.title | Title of the column display popover | `显示设置` |
| Table.display.keepOneTip | Tip shown when hiding the last visible column | `至少保留一列显示` |
| Table.search.placeholder | Placeholder of the search input | `请输入关键词搜索` |
| Table.addBtnText | Text of the header add button | `添加` |
| Table.dialog.addTitle | Title of the create dialog | `新增` |
| Table.dialog.editTitle | Title of the edit dialog | `编辑` |
| Table.dialog.confirmText | Confirm button text of the create / edit dialog | `确认` |
| Table.dialog.cancelText | Cancel button text of the create / edit dialog | `取消` |
| Table.deleteDialog.title | Title of the delete confirm dialog | `确认删除` |
| Table.deleteDialog.content | Content of the delete confirm dialog | `确定要删除该条数据吗？此操作不可恢复。` |
| Table.deleteDialog.confirmText | Confirm button text of the delete confirm dialog | `确认删除` |
| Table.deleteDialog.cancelText | Cancel button text of the delete confirm dialog | `取消` |

Priority: **component config (e.g. `option.footer.submitBtn.text` / `option.operation.options`) > `componentOptions` > locale**.

The locale messages and types are exported for customization or direct reading:

```ts
import { zhCN, enUS, npLocales } from 'naive-plus'
import type {
  NpLocale,
  NpLocaleMessages,
  NpLocaleMessagesInput,
  NpLocaleOption,
} from 'naive-plus'
```

For other languages, pass a custom locale messages object to `locale` (`NpLocaleMessagesInput` only requires the fields to override, the fields left out keep the built-in texts):

```ts
import type { NpLocaleMessagesInput } from 'naive-plus'

const jaJP: NpLocaleMessagesInput = {
  Form: {
    footer: { submitBtnText: '送信', resetBtnText: 'リセット' },
  },
}
```

```vue
<NpConfigProvider :locale="jaJP">
  <!-- children -->
</NpConfigProvider>
```

`zh` / `en` are built in. Full localized texts are provided by the locale messages (`NpLocaleMessages`); `componentOptions` can also override texts through the exposed fields such as `Form.footer.submitBtn.text`, but prefer `locale` when you need complete localization.

## Notes

- The following kinds of props **cannot** be set globally, they must be specified at the usage site:
  - Content: `label` / `value` / `description` / `icon` / `title` (including the `footer` slot content of `NpCell`; except the title of the `NpTable` operation column, see `Table.operation.label`)
  - State: `modelValue` / `checked` / `keys` / `params`
  - Data source: `options` / `items`
  - Pagination: `pagination` (pagination state is managed inside `NpTable`)
  - Data contract: `labelField` / `valueField` / `urlOnly`
  - Event callbacks: `click` / `onClick` / `onChange`
- The `props` passed to naive-ui (and `Button`'s `style`) are merged with a single level (shallow merge), so both provider and component settings take effect, and the component's own value wins on conflicts; nested objects are not deep merged and are taken from the component itself as a whole.
- `NpForm`'s `column` is merged into every form item (`props` into control props, `formItemProps` into form item props).
- `NpForm`'s `footer` is merged with `option.footer` layer by layer (`formItemProps` / `style` / `submitBtn` / `resetBtn` are unioned), while `option.footer === false` still hides the whole footer.
- `NpTable`'s `column` is merged into every column (`props` into column props, `formProps` into the column config of the CRUD form, where `formProps.props` / `formProps.formItemProps` (including the ones inside `addProps` / `editProps`) are merged with a single level); column-own fields (content / data source / data contract / state / event) are stripped and never inherited from the global config.
- Size / border of cells inside `NpCellGroup` is controlled by `NpCellGroup`'s own props, not by the `Cell` options.
- Nested `NpConfigProvider` inherits the outer `componentOptions` when the inner one does not pass `componentOptions`; passing it explicitly replaces the outer config instead of merging it. `locale` is inherited from the outer provider when omitted, and the inner value wins when specified.

## Custom Components

When a custom component needs to read the global configuration, inject `npConfigProviderInjectionKey` (its value is `Ref<NpComponentOptions | undefined>`):

```ts
import { computed, inject } from 'vue'
import { npConfigProviderInjectionKey } from 'naive-plus'

const componentOptions = inject(npConfigProviderInjectionKey, undefined)
// Read the global Cell config and fall back to the built-in defaults
const cellOptions = computed(() => ({
  size: 'medium',
  ...componentOptions?.value?.Cell,
}))
```

To read the locale messages, inject `npLocaleInjectionKey` (its value is `Ref<NpLocaleMessages>`); it falls back to Chinese when not provided:

```ts
import { computed, inject } from 'vue'
import { npLocaleInjectionKey, zhCN } from 'naive-plus'

const locale = inject(npLocaleInjectionKey, undefined)
const messages = computed(() => locale?.value ?? zhCN)
```
