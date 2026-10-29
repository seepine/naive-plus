---
permalink: /components/np-config-provider/
---

# NpConfigProvider

组件全局默认配置，用于统一修改组件 prop 的默认值，避免在每处调用点重复书写。

优先级：**组件自身 prop > NpConfigProvider > 组件内置默认值**。

## 基础用法

通过 `component-options` 配置各组件的默认 props，key 为组件名（PascalCase，去掉 `Np` 前缀）。

<demo src="../__demos__/basic.vue"></demo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| ---------------- | ---------------------- | ------------------- | ------ |
| componentOptions | 各组件的默认 props 覆盖 | `NpComponentOptions` | -（未传时继承外层，无外层时视为 `{}`） |
| locale | 组件内置文案语言，支持内置的 `'zh'` / `'en'`，也可直接传入自定义语言包；未传时继承外层 `NpConfigProvider` | `NpLocaleOption`（`'zh' \| 'en' \| NpLocaleMessagesInput`） | `'zh'`（无外层时） |

## NpComponentOptions

只开放「展示类」属性（`Button` 例外：除 `click` / `onClick` 外全部 props 均可配置；`Form` 的 `column.props` 按控件类型透传），下面列出各组件可配置的字段。具体类型由各组件自身定义并导出。

| 字段 | 可配置项 | 类型 |
| ---------- | ---------------------------------------- | ------------------------ |
| Button | 除 `click` / `onClick` 外的全部 props | `NpButtonConfigProps` |
| Cell | `hover` / `arrow` / `bordered` / `size` | `NpCellConfigProps` |
| CellGroup | `size` / `bordered` | `NpCellGroupConfigProps` |
| Checkbox | `loadingDelay` / `props` | `NpCheckboxConfigProps` |
| Radio | `type` / `loadingDelay` / `props` | `NpRadioConfigProps` |
| Upload | `props` | `NpUploadConfigProps` |
| Filter | `trigger` / `placement` | `NpFilterConfigProps` |
| Form | `enterSubmitMode` / `grid` / `props` / `column` / `footer` | `NpFormConfigProps` |
| Table | `rowKey` / `props` / `formProps` / `column` / `operation` | `NpTableConfigProps` |

### NpFormConfigProps

| 字段 | 说明 | 类型 |
| ---------------- | ---------------------------- | ------------------------------- |
| enterSubmitMode | 回车提交模式 | `'last' \| 'all' \| false` |
| grid | 栅格布局配置 | `Partial<GridProps>` |
| props | 透传给 `n-form` 的属性 | `FormOption['props']` |
| column | 每个表单项的默认配置 | `NpFormColumnConfigProps` |
| column.props | 所有表单项默认的控件属性，按 `type` 选择合法属性 | `AnyObject` |
| column.formItemProps | 所有表单项默认的表单项属性 | `FormGridItemProps` |
| footer | 底部的默认配置 | `NpFormFooterConfigProps` |

### NpFormFooterConfigProps

| 字段 | 说明 | 类型 |
| ---------------- | ---------------------------- | ---------------------- |
| formItemProps | 底部表单项属性，`span` 可控制底部占位 | `FormGridItemProps` |
| style | 底部内容容器样式 | `CSSProperties` |
| align | 底部内容对齐方式，`right` 时校验反馈同步靠右 | `'left' \| 'right'` |
| submitErrorFeedback | 提交异常时是否将错误信息展示在底部校验反馈中 | `boolean` |
| submitBtn | 提交按钮配置，`false` 表示不显示 | `false \| { text?, props? }` |
| resetBtn | 重置按钮配置，`false` 表示不显示 | `false \| { text?, props? }` |

### NpTableConfigProps

| 字段 | 说明 | 类型 |
| -------------------- | -------------------------------- | --------------------------- |
| rowKey | 行数据主键字段名 | `string` |
| props | 透传给 `n-data-table` 的属性 | `TableOption['props']` |
| formProps | 新增/编辑弹窗中表单的属性 | `FormOption['props']` |
| column | 每一列的默认配置 | `NpTableColumnConfigProps` |
| column.props | 所有列默认的 naive-ui 列属性（`children` 除外，属于列自身结构） | `Omit<TableColumn['props'], 'children'>` |
| column.formProps | 所有列默认的表单属性（新增/编辑弹窗），不含内容 / 数据源 / 数据契约 / 状态 / 事件字段 | `NpTableColumnFormConfigProps` |
| column.formProps.addProps | 新增弹窗的列表单默认属性，同名属性优先于 `column.formProps` | `NpTableColumnFormConfigProps['addProps']` |
| column.formProps.editProps | 编辑弹窗的列表单默认属性，同名属性优先于 `column.formProps` | `NpTableColumnFormConfigProps['editProps']` |
| operation | 操作列的默认配置 | `NpTableOperationConfigProps` |

### NpTableOperationConfigProps

| 字段 | 说明 | 类型 |
| -------------------- | -------------------------------------------- | --------------------------- |
| label | 操作列标题，默认取语言包中的 `Table.operation.label` | `string` |
| defaultOptions | 内置编辑 / 删除操作项的默认配置，逐项合并到内置默认值 | `TableOperationDefaultOptions` |
| 其他 | 除 `key` / `title` / `render` / `type` 外的 `NTableColumn` 属性（如 `width` / `align` / `fixed` / `ellipsis`），作为操作列的默认值 | `Omit<NTableColumn<T>, 'key' \| 'title' \| 'render' \| 'type'>` |

> `option.operation` 中的同名配置优先级更高；`option.operation` 传 `false` 时仍然隐藏整个操作列。

## 多语言

通过 `locale` 统一修改组件内部硬编码的文案，支持内置语言 `'zh'`（默认）与 `'en'`，也可直接传入自定义语言包（`NpLocaleMessagesInput`）以支持任意语种。

<demo src="../__demos__/locale.vue"></demo>

语言包结构（`NpLocaleMessages`）：

| 字段 | 说明 | 中文默认值 |
| ------------------------------------ | ------------------------ | ---------------------------------------- |
| Form.footer.submitBtnText | 提交按钮文字 | `提交` |
| Form.footer.resetBtnText | 重置按钮文字 | `重置` |
| Form.uploadPendingTip | 文件上传未完成时的校验提示 | `文件上传未完成` |
| Upload.uploadFailedTip | 上传失败提示前缀 | `上传失败` |
| Upload.unknownError | 未知错误提示 | `未知错误` |
| Upload.uploadBtnText | 默认上传按钮文字 | `上传文件` |
| Filter.clearAllText | 清除所有筛选项的文字 | `清除所有筛选` |
| Table.operation.label | 操作列标题 | `操作` |
| Table.operation.editLabel | 操作项「编辑」文字 | `编辑` |
| Table.operation.delLabel | 操作项「删除」文字 | `删除` |
| Table.display.title | 列显隐设置弹窗标题 | `显示设置` |
| Table.display.keepOneTip | 最后一个显示列被隐藏时的提示 | `至少保留一列显示` |
| Table.search.placeholder | 搜索框占位文本 | `请输入关键词搜索` |
| Table.addBtnText | 顶部「添加」按钮文字 | `添加` |
| Table.dialog.addTitle | 新增弹窗标题 | `新增` |
| Table.dialog.editTitle | 编辑弹窗标题 | `编辑` |
| Table.dialog.confirmText | 新增 / 编辑弹窗确认按钮文字 | `确认` |
| Table.dialog.cancelText | 新增 / 编辑弹窗取消按钮文字 | `取消` |
| Table.deleteDialog.title | 删除确认弹窗标题 | `确认删除` |
| Table.deleteDialog.content | 删除确认弹窗内容 | `确定要删除该条数据吗？此操作不可恢复。` |
| Table.deleteDialog.confirmText | 删除确认弹窗确认按钮文字 | `确认删除` |
| Table.deleteDialog.cancelText | 删除确认弹窗取消按钮文字 | `取消` |

文案优先级：**组件自身配置（如 `option.footer.submitBtn.text` / `option.operation.options`）> `componentOptions` > 语言包**。

语言包与类型已导出，可用于自定义或按需读取：

```ts
import { zhCN, enUS, npLocales } from 'naive-plus'
import type {
  NpLocale,
  NpLocaleMessages,
  NpLocaleMessagesInput,
  NpLocaleOption,
} from 'naive-plus'
```

需要其他语种时，直接传入自定义语言包即可（`NpLocaleMessagesInput` 允许只写需要覆盖的字段，未覆盖的字段沿用内置语言包）：

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
  <!-- 子组件 -->
</NpConfigProvider>
```

`locale` 内置 `zh` / `en`，完整的多语言文案由语言包（`NpLocaleMessages`）提供；`componentOptions` 也可通过 `Form.footer.submitBtn.text` 等已开放字段覆盖文案，需要完整多语言时优先使用 `locale`。

## 说明

- 以下类型的属性**不支持**全局配置，需在使用处指定：
  - 内容：`label` / `value` / `description` / `icon` / `title`（含 `NpCell` 的 `footer` 插槽内容；`NpTable` 操作列的标题除外，见 `Table.operation.label`）
  - 状态：`modelValue` / `checked` / `keys` / `params`
  - 数据源：`options` / `items`
  - 分页：`pagination`（分页状态由 `NpTable` 内部管理）
  - 数据契约：`labelField` / `valueField` / `urlOnly`
  - 事件回调：`click` / `onClick` / `onChange`
- 透传 naive-ui 的 `props`（以及 `Button` 的 `style`）只做一层合并（浅合并）：provider 与组件自身同时设置时取并集，同名属性以组件自身为准；嵌套对象不会深度合并，整体以组件自身为准。
- `NpForm` 的 `column` 会合并到每一个表单项（`props` 合并到控件属性，`formItemProps` 合并到表单项属性）。
- `NpForm` 的 `footer` 会与 `option.footer` 逐层合并（`formItemProps` / `style` / `submitBtn` / `resetBtn` 取并集），`option.footer === false` 仍然隐藏整个底部。
- `NpTable` 的 `column` 会合并到每一列（`props` 合并到列属性，`formProps` 合并到新增/编辑表单的列配置，其中 `formProps.props` / `formProps.formItemProps`（含 `addProps` / `editProps` 中的）做一层合并）；列自身专属的字段（内容 / 数据源 / 数据契约 / 状态 / 事件）会被剔除，不会从全局配置继承。
- `NpCellGroup` 内部单元格的尺寸/边框由 `NpCellGroup` 自身的 props 决定，不受 `Cell` 配置影响。
- 支持嵌套：内层 `NpConfigProvider` 未传 `componentOptions` 时继承外层配置，显式传入时会整体替换外层配置（不合并）；`locale` 未显式传入时继承外层，显式传入时以自身为准。

## 自定义组件接入

自定义组件需要读取全局配置时，注入 `npConfigProviderInjectionKey` 即可（值为 `Ref<NpComponentOptions | undefined>`）：

```ts
import { computed, inject } from 'vue'
import { npConfigProviderInjectionKey } from 'naive-plus'

const componentOptions = inject(npConfigProviderInjectionKey, undefined)
// 读取 Cell 的全局配置，并回落到组件内置默认值
const cellOptions = computed(() => ({
  size: 'medium',
  ...componentOptions?.value?.Cell,
}))
```

需要读取语言包时，注入 `npLocaleInjectionKey`（值为 `Ref<NpLocaleMessages>`），未注入时回落到中文：

```ts
import { computed, inject } from 'vue'
import { npLocaleInjectionKey, zhCN } from 'naive-plus'

const locale = inject(npLocaleInjectionKey, undefined)
const messages = computed(() => locale?.value ?? zhCN)
```
