---
permalink: /table/base/
---

# np-table 表格

配置驱动视图的表格，通过 `columns` 动态生成表格，用法简单且具有高扩展性。

## 基础用法

表格主要通过 `option` 配置 `columns` 动态生成表格，`api.fetch` 获取数据。

<demo src="../__demos__/basic.vue"></demo>

## 组件配置

### Props

| 属性   | 说明     | 类型                        | 默认值 |
| ------ | -------- | --------------------------- | ------ |
| option | 配置参数 | [TableOption](#tableoption) | -      |

### Methods

通过 `ref` 获取表格实例后，可调用以下主动方法，详见 [主动方法](/table/expose/)。

| 方法    | 说明                                                    | 类型                  |
| ------- | ------------------------------------------------------- | --------------------- |
| reload  | 重新加载数据，会重置到第一页                            | `() => Promise<void>` |
| refresh | 重新刷新当前页数据                                      | `() => Promise<void>` |
| params  | 绑定的查询参数，会作为 `queryParams` 传递给 `api.fetch` | `Record<string, any>` |

## 类型定义

组件导出以下类型定义

```ts
import type {
  TableOption,
  TableColumn,
  TableFilter,
  TableSearchOption,
  NpTableInst,
} from 'naive-plus'
```

### TableOption

| 属性       | 说明                                                                                                                                        | 类型                                                                     | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------ |
| columns    | 表格列                                                                                                                                      | Array<[TableColumn](#tablecolumn)>                                       | -      |
| api        | 数据接口                                                                                                                                    | `{ fetch: (pageParams, otherParams) => Promise<{ items, itemCount? }> }` | -      |
| props      | 表格属性，会透传给 `n-data-table`。为避免表格内部纵向滚动遮挡页面内容，会忽略 `maxHeight`、`flexHeight`、`virtualScroll` 等纵向滚动相关配置 | object                                                                   | -      |
| pagination | 分页配置，设为 `false` 可禁用分页                                                                                                           | `false` / `PaginationConfig`                                             | -      |
| filters    | 筛选器配置                                                                                                                                  | Array<[TableFilter](/table/filter/)>                                     | -      |
| search     | 搜索框配置，不传或为 `false` 时不显示                                                                                                       | `false` / [TableSearchOption](/table/search/#tablesearchoption)          | -      |
| slots      | 插槽配置，优先级高于组件同名插槽                                                                                                            | [TableSlotOption](/table/slot/#tableslotoption)                          | -      |

### TableColumn

| 属性      | 说明                                                             | 类型                           | 默认值 |
| --------- | ---------------------------------------------------------------- | ------------------------------ | ------ |
| key       | 列字段名称                                                       | string                         | -      |
| label     | 列标题                                                           | string                         | -      |
| render    | 自定义渲染函数                                                   | `(rowData: T, rowIndex) => VNodeChild` | -      |
| props     | 列属性，透传给 `n-data-table`（如 `width`、`minWidth`、`fixed`） | object                         | -      |
| display   | 是否在表格中显示该列，`false` 表示彻底隐藏（常用于仅表单字段）   | boolean                        | true   |
| formProps | 表单字段配置，详见 [CRUD 增删改查](/table/crud/#formprops)       | object                         | -      |

## 全局默认值

可通过 [NpConfigProvider](/components/np-config-provider/) 统一配置 `rowKey` / `props` / `formProps` / `operation`，以及每一列的默认 `column`（`props` 合并到列属性，`formProps` 合并到新增/编辑表单的列配置），`option` 中的同名配置优先级更高。

```vue
<np-config-provider
  :component-options="{
    Table: {
      rowKey: 'id',
      props: { size: 'small' },
      column: { props: { align: 'center' }, formProps: { props: { size: 'small' } } },
    },
  }"
>
  <np-table :option="option" />
</np-config-provider>
```
