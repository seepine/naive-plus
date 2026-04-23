import { computed, defineComponent, onMounted, ref } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npTableProps } from './props'
import { NDataTable, type PaginationProps, type TableProps } from 'naive-ui'
import { isFunction } from '../../utils'
import NpTableHeader from './np-table-header/src/np-table-header.vue'

const { name, bemClass } = useCreate('np-table')

export default defineComponent({
  name,
  props: npTableProps,
  setup(props) {
    const loading = ref(false)
    const page = ref(1)
    const pageSize = ref((props.option.pagination || {}).defaultPageSize || 10)
    const itemCount = ref(0)
    const data = ref<any[]>([])
    const queryParams = ref<Record<string, any>>({})
    const columns = ref<any[]>([])

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

    onMounted(() => {
      columns.value = props.option.columns.map(item => ({
        ...item,
        display: item.display !== false,
      }))
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

    const tableProps = computed<TableProps>(() => {
      return {
        rowKey: (item: Record<string, any>): string | number => {
          return item[props.option.rowKey || 'id']
        },
        bordered: true,
        singleLine: true,
        remote: true,
        ...props.option.props,
      }
    })

    const displayColumns = computed(() => {
      return columns.value.filter(item => item.display !== false)
    })

    const handleFilterChange = (key: string, value: any) => {
      queryParams.value = {
        ...queryParams.value,
        [key]: value,
      }
      page.value = 1
      fetchData()
    }

    const handleDisplayChange = (newColumns: any[]) => {
      columns.value = newColumns
    }

    return () => (
      <div class={bemClass.value}>
        <NpTableHeader
          filters={props.option.filters}
          columns={columns.value}
          onRefresh={fetchData}
          onFilterChange={handleFilterChange}
          onDisplayChange={handleDisplayChange}
        >
          {{
            'header-left': () => null,
            'header-right': () => null,
          }}
        </NpTableHeader>
        <NDataTable
          {...tableProps.value}
          loading={loading.value}
          columns={displayColumns.value}
          data={data.value}
          pagination={pagination.value}
        />
      </div>
    )
  },
})
