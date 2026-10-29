import type { VNode, VNodeChild } from 'vue'
import type {
  DataTableProps,
  OnUpdateCheckedRowKeys,
  TableBaseColumn,
} from 'naive-ui/es/data-table/src/interface'
import type { AnyObject, AsyncValue } from '../../types'
import type { DropdownOption, InputProps, PaginationProps } from 'naive-ui'
import type { NpFilterItem } from '../../np-filter'
import type {
  FormColumn,
  FormColumnBase,
  FormColumnComponent,
  FormOption,
} from '../../np-form'

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
  /**
   * 自定义表格渲染
   * @param rowData 行数据
   * @param rowIndex 行序号
   * @returns VNodeChild
   */
  render?: (rowData: T, rowIndex: number) => VNodeChild
  /**
   * Naive Table Column Props 属性
   */
  props?: Omit<NTableColumn<T>, 'key' | 'title' | 'render' | 'type'>
  /**
   * 显隐
   */
  display?: boolean
  /**
   * 表单额外属性
   */
  formProps?: Partial<FormColumn<T>> & {
    addProps?: Partial<FormColumn<T>>
    editProps?: Partial<FormColumn<T>>
  }
}

export type TableFilter = NpFilterItem

export interface TableSearchOption {
  /**
   * 提交给 `api.fetch` 的查询参数名
   * @default 'keyword'
   */
  key?: string
  /**
   * 输入框占位文本
   * @defaultValue 取语言包中的 `Table.search.placeholder`（zh 为 `请输入关键词搜索`）
   */
  placeholder?: string
  /**
   * 输入框宽度
   * @default 220
   */
  width?: string | number
  /**
   * 是否可清空
   * @default true
   */
  clearable?: boolean
  /**
   * 输入防抖时间（毫秒），停止输入后自动触发搜索
   * @default 300
   */
  debounce?: number
  /**
   * 透传给 `n-input` 的其他属性
   */
  props?: InputProps
}

export type TableOperationOption = DropdownOption & {
  type?: 'edit' | 'del'
}

/**
 * 内置操作项的默认配置，`edit` / `del` 分别对应编辑、删除
 */
export type TableOperationDefaultOptions = Partial<
  Record<'edit' | 'del', Omit<TableOperationOption, 'type'>>
>

export type TableOperationOptions<T extends AnyObject = AnyObject> =
  | TableOperationOption[]
  | ((rowData: T, rowIndex: number) => TableOperationOption[])

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

export interface TableSlotOption {
  /**
   * 顶部左侧内容，优先级高于组件的 headerLeft 插槽
   */
  headerLeft?: () => VNodeChild
  /**
   * 顶部右侧内容，优先级高于组件的 headerRight 插槽
   */
  headerRight?: () => VNodeChild
  /**
   * 底部左侧内容，优先级高于组件的 footerLeft 插槽
   */
  footerLeft?: () => VNodeChild
}

export interface NpTableInst {
  /**
   * 重新加载数据，会重置到第一页
   */
  reload: () => Promise<void>
  /**
   * 重新刷新当前页数据
   */
  refresh: () => Promise<void>
  /**
   * 绑定的查询参数，会作为 `queryParams` 传递给 `option.api.fetch`
   */
  params: Record<string, any>
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

    add?: (rowData: T) => AsyncValue<T | boolean | void>
    edit?: (rowData: T) => AsyncValue<T | boolean | void>
    del?: (rowData: T) => AsyncValue<T | boolean | void>
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
        disabled?: (rowData: T) => boolean
        onChange?: OnUpdateCheckedRowKeys
      }

  formProps?: FormOption['props']

  operation?:
    | false
    | (Omit<NTableColumn<T>, 'key' | 'title' | 'render' | 'type'> & {
        label?: string
        prefixRender?: (
          rowData: T,
          rowIndex: number
        ) => VNode | VNode[] | undefined
        suffixRender?: (
          rowData: T,
          rowIndex: number
        ) => VNode | VNode[] | undefined

        options?: TableOperationOptions<T>
        /**
         * 内置编辑 / 删除操作项的默认配置，逐项合并到内置默认值
         * （只写 `label` 时仍会保留内置的 `key` 等字段）
         *
         * `options` 中只写 `{ type: 'edit' }` / `{ type: 'del' }` 时，
         * 会与这里的配置合并，同名属性以 `options` 中的为准
         */
        defaultOptions?: TableOperationDefaultOptions
        onSelect?: (key: string, rowData: T, rowIndex: number) => void | boolean

        onBefore?: (
          rowData: T,
          type: 'add' | 'edit' | 'del'
        ) => boolean | T | void | Promise<boolean | T | void>
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
  /**
   * 搜索框配置，不传或为 `false` 时不显示
   */
  search?: false | TableSearchOption
  slots?: TableSlotOption
}

/**
 * 列自身专属的字段：内容（`label` / `key` / `render` / `slots`）、
 * 数据源（`options`）、数据契约（`rule` / `urlOnly`）、
 * 状态（`defaultValue`）与事件（`onChange`）
 */
type ColumnOwnKeys =
  | 'label'
  | 'key'
  | 'render'
  | 'slots'
  | 'options'
  | 'rule'
  | 'urlOnly'
  | 'defaultValue'
  | 'onChange'

/**
 * 去掉列自身专属的字段，保留联合类型的结构
 */
type OmitColumnOwnKeys<T> = T extends unknown ? Omit<T, ColumnOwnKeys> : never

/**
 * 全局可配置的列表单字段：`type` / `props` / `formItemProps` / `display`，
 * 并保留 `type` 与 `props` 的对应关系
 */
type ColumnFormPropsBase = OmitColumnOwnKeys<Partial<FormColumnBase>> &
  OmitColumnOwnKeys<Partial<FormColumnComponent>>

/**
 * 全局列表单配置：只提供展示属性，不允许覆盖列自身的内容 / 数据源 /
 * 数据契约 / 状态 / 事件字段
 */
export type NpTableColumnFormConfigProps = ColumnFormPropsBase & {
  /** 新增弹窗的列表单属性 */
  addProps?: ColumnFormPropsBase
  /** 编辑弹窗的列表单属性 */
  editProps?: ColumnFormPropsBase
}

export interface NpTableColumnConfigProps<T extends AnyObject = AnyObject> {
  /** 所有列默认的 naive-ui 列属性，列自身 `props` 优先级更高；`children` 属于列自身结构，不支持全局配置 */
  props?: Omit<
    NTableColumn<T>,
    'key' | 'title' | 'render' | 'type' | 'children'
  >
  /**
   * 所有列默认的表单属性（新增 / 编辑弹窗），列自身 `formProps` 优先级更高；
   * 列自身专属的字段（内容 / 数据源 / 数据契约 / 状态 / 事件）不支持全局配置，
   * 具体见 `NpTableColumnFormConfigProps`
   */
  formProps?: NpTableColumnFormConfigProps
}

/**
 * `NpTable` 操作列的全局默认配置
 *
 * 除 `key` / `title` / `render` / `type` 外，支持 `NTableColumn` 的全部属性
 * （如 `width` / `align` / `fixed` / `ellipsis`），与 `TableOption['operation']` 保持一致
 */
export type NpTableOperationConfigProps<T extends AnyObject = AnyObject> = Omit<
  NTableColumn<T>,
  'key' | 'title' | 'render' | 'type'
> & {
  /** 操作列标题 */
  label?: string
  /** 内置编辑 / 删除操作项的默认配置 */
  defaultOptions?: TableOperationDefaultOptions
}

/**
 * `NpTable` 全局默认配置
 *
 * 只挑出适合全局统一的字段；`api` / `columns` / `pagination` / `selection` /
 * `operation` 的 `options` / `filters` / `search` / `slots` 等由使用场景决定，不开放。
 */
export interface NpTableConfigProps<T extends AnyObject = AnyObject> {
  /** 行数据主键字段名 */
  rowKey?: TableOption['rowKey']
  /** 透传给 `n-data-table` 的属性 */
  props?: TableOption['props']
  /** 新增 / 编辑弹窗中表单的属性（`FormOption['props']`） */
  formProps?: TableOption['formProps']
  /** 每一列的默认配置 */
  column?: NpTableColumnConfigProps<T>
  /** 操作列的默认配置 */
  operation?: NpTableOperationConfigProps<T>
}
