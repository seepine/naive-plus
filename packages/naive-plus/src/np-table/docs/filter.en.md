---
permalink: /en/table/filter/
lang: en-US
---

# np-table Filter

Configure table filters via `filters`, supporting single/multi-select and search.

<demo src="../__demos__/filter.en.vue"></demo>

## Types

```ts
import type { TableFilter } from 'naive-plus'
```

### TableFilter

| Prop | Description | Type | Default |
| ---------- | ------------ | ------------------------------------ | ------ |
| key        | Filter field name   | string                                | -      |
| label      | Filter label   | string                                | -      |
| options    | Filter options | `Array<{ label: string, value: any }>` | -      |
| multiple   | Whether multi-select is supported | boolean                              | false  |
| searchable | Whether the filter is searchable   | boolean                              | false  |
