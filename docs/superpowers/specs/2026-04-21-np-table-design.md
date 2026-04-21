# np-table Component Design

## 1. Concept

`np-table` wraps naive-ui's `n-data-table` with an `option` prop pattern (like `np-form`). Users define columns and an API fetch function, and the component handles data fetching, pagination, and rendering automatically.

## 2. Interface

```typescript
export interface TableOption {
  columns: TableColumn[]
  api: {
    fetch: (
      pageParams: { page: number; pageSize: number },
      otherParams: Record<string, any>
    ) => Promise<{ pageSizes?: number; pageCount?: number; items: any[] }>
  }
  props?: Omit<NDataTableProps, 'columns' | 'data' | 'pagination'>
  pagination?: false | PaginationConfig
}

export interface TableColumn {
  key: string
  title?: string | ComputedRef<string>
  render?: (rowData: any, rowIndex: number) => VNode
  type?: 'selection' | 'index' | 'expand'
  width?: string | number
  minWidth?: string | number
  fixed?: 'left' | 'right'
  // ... other NTableColumnProps
}
```

## 3. Data Flow

1. **Mount** → call `api.fetch({ page: 1, pageSize: 10 }, {})` → store `items`
2. **Page/pageSize change** → call `api.fetch({ page, pageSize }, {})` → update `items`
3. **Pagination** → uses `pageSizes` / `pageCount` from fetch response if provided
4. **Columns** → dynamically render via `columns` prop on `n-data-table`

## 4. File Structure

```
packages/naive-plus/src/np-table/
├── __demos__/basic.vue
├── __tests__/np-table.test.tsx
├── docs/README.md
├── src/
│   ├── interface.ts
│   ├── np-table.tsx
│   └── props.ts
├── style/index.scss
└── index.ts
```

## 5. Implementation Notes

- Use `useCreate` utility for component naming
- Use `NPagination` from naive-ui for pagination
- Internal state: `loading`, `page`, `pageSize`, `pageCount`, `itemCount`, `data`
- `option.api.fetch` is required (no optional)
- `option.pagination === false` disables pagination
- All naive-ui `n-data-table` props passed via `option.props`
