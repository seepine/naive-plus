import type { VNode } from 'vue'
import type {
  DataTableProps,
  OnUpdateCheckedRowKeys,
  TableBaseColumn,
} from 'naive-ui/es/data-table/src/interface'
import type { AnyObject } from '../../types'
import type { PaginationProps } from 'naive-ui'
import type { NpFilterItem } from '../../np-filter'
import type { FormColumn } from '../../np-form'

export type NTableColumn<T extends AnyObject = AnyObject> = TableBaseColumn<T>
// | TableSelectionColumn<T>
// | TableExpandColumn<T>

export type NTableColumnExt = NTableColumn & {
  display?: boolean
  key: string
  label: string
}

export type TableColumn<T extends AnyObject = AnyObject> = {
  key: string
  label: string
  render?: (rowData: any, rowIndex: number) => VNode
  props?: Omit<NTableColumn<T>, 'key' | 'title' | 'render' | 'type'>
  display?: boolean
  formProps?: Partial<FormColumn<T>> & {
    addProps?: Partial<FormColumn<T>>
    editProps?: Partial<FormColumn<T>>
    viewProps?: Partial<FormColumn<T>>
  }
}

export interface TableApiFetchResult<T extends AnyObject = AnyObject> {
  /**
   * 总条数
   */
  itemCount?: number
  /**
   * 数据列表
   */
  items: T[]
}

export interface TableOption<T extends AnyObject = AnyObject> {
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
    | 'columns'
    | 'pagination'
    | 'data'
    | 'loading'
    | 'rowKey'
    | 'onUpdateCheckedRowKeys'
  > & {}

  selection?:
    | boolean
    | {
        multiple?: boolean
        disabled?: (row: T) => boolean
        onChange?: OnUpdateCheckedRowKeys
      }

  operation?:
    | false
    | (Omit<NTableColumn<T>, 'key' | 'title' | 'render' | 'type'> & {
        label?: string
        prefixRender?: (rowData: any, rowIndex: number) => VNode
        suffixRender?: (rowData: any, rowIndex: number) => VNode
      })

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
