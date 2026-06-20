---
url: /table/filter/index.md
---
# np-table 筛选

通过 `filters` 配置表格筛选器，支持单选/多选、搜索功能。

## 类型定义

```ts
import type { TableFilter } from 'naive-plus'
```

### TableFilter

| 属性       | 说明         | 类型                                   | 默认值 |
| ---------- | ------------ | ------------------------------------ | ------ |
| key        | 筛选字段名   | string                               | -      |
| label      | 筛选器标签   | string                               | -      |
| options    | 筛选选项列表 | `Array<{ label: string, value: any }>` | -      |
| multiple   | 是否支持多选 | boolean                              | false  |
| searchable | 是否可搜索   | boolean                              | false  |
