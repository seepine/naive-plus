import { computed, defineComponent, onMounted, ref } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npTableProps } from './props'
import {
  NButton,
  NDataTable,
  NIcon,
  NPagination,
  type DataTableProps,
  type PaginationProps,
} from 'naive-ui'
import { isFunction, isObject } from '../../utils'
import IconButtonGroup from './np-table-header/icon-button-group.vue'
import type { NTableColumn, NTableColumnExt } from './interface'
import IconEdit from './icon/edit.vue'
import IconDel from './icon/del.vue'
import IconAdd from './icon/add.vue'

const { name, bemClass } = useCreate('np-table')

export default defineComponent({
  name,
  props: npTableProps,
  setup(props, { slots }) {
    const loading = ref(false)
    const page = ref(1)
    const pageSize = ref((props.option.pagination || {}).defaultPageSize || 10)
    const itemCount = ref(0)
    const data = ref<any[]>([])
    const queryParams = ref<Record<string, any>>({})
    /**
     * 表格 columns
     */
    const columns = ref<NTableColumnExt[]>([])

    const fetchData = async () => {
      if (loading.value) {
        return
      }
      if (!isFunction(props.option.api?.fetch)) {
        return
      }

      loading.value = true
      try {
        const result = await props.option.api.fetch(
          { page: page.value, pageSize: pageSize.value },
          queryParams.value
        )
        data.value = result.items || []
        if (result.itemCount !== undefined) {
          itemCount.value = result.itemCount
        }
      } finally {
        loading.value = false
      }
    }

    const resetColumn = () => {
      columns.value = props.option.columns
        .map(item => ({
          ...item,
          ...item.props,
          title: item.label,
          display: item.display !== false,
        }))
        .filter(item => item.display)
    }

    onMounted(() => {
      resetColumn()
      fetchData()
    })

    const paginationInfo = computed(() => {
      const basePagination: PaginationProps = {
        pageSizes: [10, 20, 50, 100],
        showSizePicker: true,
        showQuickJumper: false,
        showQuickJumpDropdown: true,
        pageSlot: 5,
      }

      return {
        ...basePagination,
        ...props.option.pagination,
      }
    })

    const pagination = computed(() => {
      if (props.option.pagination === false) {
        return false
      }
      return {
        ...paginationInfo.value,
        page: page.value,
        pageSize: pageSize.value,
        itemCount: itemCount.value,
        onUpdatePage: (newPage: number) => {
          page.value = newPage
          fetchData()
        },
        onUpdatePageSize: (newPageSize: number) => {
          pageSize.value = newPageSize
          page.value = 1
          fetchData()
        },
      }
    })

    const tableProps = computed<DataTableProps>(() => {
      return {
        rowKey: (item: Record<string, any>): string | number => {
          return item[props.option.rowKey || 'id']
        },
        bordered: false,
        remote: true,
        ...props.option.props,
        onUpdateCheckedRowKeys: (keys, rows, meta) => {
          if (isObject(props.option.selection)) {
            props.option.selection?.onChange?.(keys, rows, meta)
          }
        },
      }
    })

    const handleFilterChange = (val: Record<string, any>) => {
      queryParams.value = {
        ...val,
      }
      page.value = 1
      fetchData()
    }

    const displayColumns = computed<NTableColumn[]>(() => {
      const list: NTableColumn[] = columns.value.filter(item => item.display)
      // selection
      console.log(props.option.selection)

      if (props.option.selection) {
        let selectionColumn: any
        if (isObject(props.option.selection)) {
          selectionColumn = {
            type: 'selection',
            key: '__selection',
            ...props.option.selection,
          }
        } else {
          selectionColumn = { type: 'selection', key: '__selection' }
        }
        list.splice(0, 0, selectionColumn)
      }
      // operation
      if (props.option.operation !== false) {
        const operation = {
          ...props.option.operation,
        }

        list.push({
          title: operation.label || '操作',
          width: 80,
          ...operation,
          key: '__operation',
          render(rowData, rowIndex) {
            return (
              <div class={`${bemClass.value}__operation`}>
                {operation.prefixRender?.(rowData, rowIndex)}
                <NButton
                  size="small"
                  secondary
                  class={`${bemClass.value}__operation-button`}
                >
                  {{
                    icon: () => (
                      <NIcon>
                        <IconEdit></IconEdit>
                      </NIcon>
                    ),
                  }}
                </NButton>
                <NButton
                  size="small"
                  secondary
                  class={`${bemClass.value}__operation-button`}
                >
                  {{
                    icon: () => (
                      <NIcon>
                        <IconDel></IconDel>
                      </NIcon>
                    ),
                  }}
                </NButton>
                {operation.suffixRender?.(rowData, rowIndex)}
              </div>
            )
          },
        })
      }

      return list
    })

    return () => (
      <div class={bemClass.value}>
        <div class={`${bemClass.value}__header`}>
          <div class={`${bemClass.value}__header-left`}>{slots.headerLeft}</div>
          <div class={`${bemClass.value}__header-right`}>
            {slots.headerRight}
            <NButton type="primary">
              {{
                icon: () => (
                  <NIcon>
                    <IconAdd></IconAdd>
                  </NIcon>
                ),
                default: () => <span>添加</span>,
              }}
            </NButton>
            <IconButtonGroup
              filters={props.option.filters}
              columns={columns.value}
              onUpdate:columns={(nextColumns: NTableColumnExt[]) => {
                columns.value = nextColumns
              }}
              onRefresh={fetchData}
              onFilterChange={handleFilterChange}
            ></IconButtonGroup>
          </div>
        </div>

        <NDataTable
          {...tableProps.value}
          loading={loading.value}
          columns={displayColumns.value}
          data={data.value}
        />

        <div class={`${bemClass.value}__footer`}>
          <div></div>
          {pagination.value ? (
            <NPagination {...pagination.value}></NPagination>
          ) : undefined}
        </div>
      </div>
    )
  },
})
