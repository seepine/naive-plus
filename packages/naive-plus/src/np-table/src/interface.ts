import type { VNode } from 'vue'
import type {
  DataTableProps,
  TableBaseColumn,
  TableExpandColumn,
  TableSelectionColumn,
} from 'naive-ui/es/data-table/src/interface'
import type { AnyObject } from '../../types'
import type { PaginationProps } from 'naive-ui'
import type { NpFilterItem } from '../../np-filter'

export type NTableColumn<T = AnyObject> =
  | TableBaseColumn<T>
  | TableSelectionColumn<T>
  | TableExpandColumn<T>

export interface TableColumn<T = AnyObject> {
  key: string
  title?: string
  render?: (rowData: any, rowIndex: number) => VNode
  type?: 'selection' | 'index' | 'expand'

  props?: Omit<NTableColumn<T>, 'key' | 'title' | 'render' | 'type'>
  display?: boolean
}

export interface TableApiFetchResult<T = AnyObject> {
  /**
   * 总条数
   */
  itemCount?: number
  /**
   * 数据列表
   */
  items: T[]
}

export interface TableOption<T = AnyObject> {
  api: {
    fetch: (
      pageParams: {
        page: number
        pageSize: number
      },
      queryParams: Record<string, any>
    ) => TableApiFetchResult<T> | Promise<TableApiFetchResult<T>>
  }
  rowKey?: string
  props?: Omit<
    DataTableProps,
    'columns' | 'pagination' | 'data' | 'loading' | 'rowKey'
  >
  pagination?:
    | false
    | {
        defaultPage?: PaginationProps['defaultPage']
        defaultPageSize?: PaginationProps['defaultPageSize']
        displayOrder?: PaginationProps['displayOrder']
        goto?: PaginationProps['goto']
        to?: PaginationProps['to']
        pageSizes?: PaginationProps['pageSizes']
        selectProps?: PaginationProps['selectProps']
        showQuickJumper?: PaginationProps['showQuickJumper']
        simple?: PaginationProps['simple']
        showSizePicker?: PaginationProps['showSizePicker']
        showQuickJumpDropdown?: PaginationProps['showQuickJumpDropdown']
        prefix?: PaginationProps['prefix']
        suffix?: PaginationProps['suffix']
        prev?: PaginationProps['prev']
        next?: PaginationProps['next']
      }
  columns: TableColumn<T>[]
  filters?: NpFilterItem[]
}
