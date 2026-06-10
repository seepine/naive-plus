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
import NpTableAction from './np-table-action.vue'
import NpTableCrudDialog from './components/np-table-crud-dialog.vue'
import NpTableDelDialog from './components/np-table-del-dialog.vue'
import type { NTableColumn, NTableColumnExt } from './interface'
import IconAdd from './icon/add.vue'
import { sanitizeTableProps } from './use-table-props'
import { useCrud } from './use-crud'

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

    const {
      dialogVisible,
      delVisible,
      crudMode,
      formData,
      dialogLoading,
      delLoading,
      delRow,
      openAction,
      handleSubmit,
      handleDel,
    } = useCrud(() => props.option, fetchData)

    onMounted(() => {
      resetColumn()
      fetchData()
    })

    const pagination = computed<PaginationProps | false>(() => {
      if (props.option.pagination === false) {
        return false
      }
      return {
        pageSizes: [10, 20, 50, 100],
        showSizePicker: true,
        showQuickJumper: false,
        showQuickJumpDropdown: true,
        pageSlot: 5,
        ...props.option.pagination,
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
      const mergedProps = sanitizeTableProps(props.option.props)

      return {
        rowKey: (item: Record<string, any>): string | number => {
          return item[props.option.rowKey || 'id']
        },
        bordered: false,
        remote: true,
        ...mergedProps,
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
      if (props.option.operation !== false) {
        // onBefore 由 useCrud 消费，这里复制 operation 并移除该字段，避免误传给列对象
        const operation: Record<string, any> = {
          ...(props.option.operation ?? {}),
        }
        delete operation.onBefore

        list.push({
          ...operation,
          title: operation.label ?? '',
          width: 80,
          key: '__operation',
          render(rowData, rowIndex) {
            return (
              <NpTableAction
                rowData={rowData}
                rowIndex={rowIndex}
                options={operation.options}
                prefixRender={operation.prefixRender}
                suffixRender={operation.suffixRender}
                onSelect={key => {
                  if (key === 'edit') {
                    openAction('edit', rowData)
                  } else if (key === 'delete') {
                    openAction('del', rowData)
                  } else {
                    operation.onSelect?.(key)
                  }
                }}
              />
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
            {props.option.operation !== false && props.option.api?.add && (
              <NButton type="primary" onClick={() => openAction('add')}>
                {{
                  icon: () => (
                    <NIcon>
                      <IconAdd></IconAdd>
                    </NIcon>
                  ),
                  default: () => <span>添加</span>,
                }}
              </NButton>
            )}
            <IconButtonGroup
              filters={props.option.filters}
              columns={columns.value}
              onUpdate:columns={next => (columns.value = next)}
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

        <NpTableCrudDialog
          visible={dialogVisible.value}
          mode={crudMode.value}
          columns={props.option.columns}
          modelValue={formData.value}
          loading={dialogLoading.value}
          formProps={props.option.formProps}
          onUpdate:visible={(val: boolean) => (dialogVisible.value = val)}
          onUpdate:modelValue={(val: Record<string, any>) =>
            (formData.value = val)
          }
          onSubmit={handleSubmit}
        />

        <NpTableDelDialog
          visible={delVisible.value}
          row={delRow.value}
          loading={delLoading.value}
          onUpdate:visible={(val: boolean) => (delVisible.value = val)}
          onConfirm={handleDel}
        />
      </div>
    )
  },
})
