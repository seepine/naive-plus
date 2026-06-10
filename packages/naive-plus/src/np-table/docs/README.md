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

## 类型定义

组件导出以下类型定义

```ts
import type { TableOption, TableColumn, TableFilter } from 'naive-plus'
```

### TableOption

| 属性       | 说明                              | 类型                                                                                 | 默认值 |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------ | ------ |
| columns    | 表格列                            | Array<[TableColumn](#tablecolumn)>                                                   | -      |
| api        | 数据接口                          | `{ fetch: (pageParams, otherParams) => Promise<{ items, itemCount? }> }`            | -      |
| props      | 表格属性，会透传给 `n-data-table`。为避免表格内部纵向滚动遮挡页面内容，会忽略 `maxHeight`、`flexHeight`、`virtualScroll` 等纵向滚动相关配置 | object                                                                               | -      |
| pagination | 分页配置，设为 `false` 可禁用分页 | `false` / `PaginationConfig`                                                         | -      |
| filters    | 筛选器配置                        | Array<[TableFilter](/table/filter/)>                                                   | -      |

### TableColumn

| 属性     | 说明           | 类型                                    | 默认值 |
| -------- | -------------- | --------------------------------------- | ------ |
| key      | 列字段名称     | string                                  | -      |
| title    | 列标题         | string / ComputedRef\<string\>          | -      |
| render   | 自定义渲染函数 | `(rowData, rowIndex) => VNode`          | -      |
| type     | 列类型         | `'selection'` / `'index'` / `'expand'`  | -      |
| width    | 列宽度         | string / number                         | -      |
| minWidth | 列最小宽度     | string / number                         | -      |
| fixed    | 列固定位置     | `'left'` / `'right'`                    | -      |
| display  | 列是否显示     | boolean                                 | true   |
