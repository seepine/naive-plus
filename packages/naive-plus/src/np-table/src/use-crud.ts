import { ref, type Ref } from 'vue'
import type { TableColumn, TableOption } from './interface'
import type { FormColumn } from '../../np-form'
import type { AnyObject } from '../../types'

export type CrudMode = 'add' | 'edit' | 'del'
type FormMode = Exclude<CrudMode, 'del'>

const MODE_PROPS_KEY = {
  add: 'addProps',
  edit: 'editProps',
} as const satisfies Record<FormMode, string>

const TITLE_MAP: Record<FormMode, string> = {
  add: '新增',
  edit: '编辑',
}

export const getFormTitle = (mode: FormMode): string => TITLE_MAP[mode]

export const buildFormColumns = (
  columns: TableColumn[],
  mode: FormMode
): FormColumn[] => {
  return columns
    .map(col => {
      const { key, label, formProps = {} } = col
      if (!formProps && !key) return null

      const modeKey = MODE_PROPS_KEY[mode] as keyof typeof formProps
      const { [modeKey]: modeProps = {}, ...baseFormProps } = formProps

      const merged: FormColumn = {
        key,
        label,
        ...baseFormProps,
        ...modeProps,
      } as FormColumn

      if (merged.display === undefined) {
        merged.display = true
      }
      return merged
    })
    .filter((col): col is FormColumn => col !== null && col.display !== false)
}

const buildAddInitData = (formColumns: FormColumn[]): AnyObject =>
  Object.fromEntries(
    formColumns
      .filter(col => col.key && (col as any).defaultValue !== undefined)
      .map(col => [col.key, (col as any).defaultValue])
  )

export const useCrud = (
  getOption: () => TableOption,
  onRefresh: () => void
) => {
  const dialogVisible = ref(false)
  const delVisible = ref(false)
  const crudMode = ref<FormMode>('add')
  const formData = ref<AnyObject>({})
  const dialogLoading = ref(false)
  const delLoading = ref(false)
  const delRow = ref<AnyObject>({})

  const openAction = async (
    type: 'add' | 'edit' | 'del',
    rowData?: AnyObject
  ): Promise<AnyObject | null> => {
    const option = getOption()
    const operation = option.operation
    if (operation === false) return null

    let data: AnyObject = rowData ?? {}

    if (operation?.onBefore) {
      try {
        const result = await operation.onBefore(data, type)
        if (result === false) return null
        // 替换初始数据：对象（排除 boolean/true）即为新数据
        if (result && typeof result === 'object') {
          data = result
        }
      } catch {
        return null
      }
    }

    if (type === 'del') {
      delRow.value = data
      delVisible.value = true
      return data
    }

    crudMode.value = type
    formData.value =
      type === 'add'
        ? buildAddInitData(buildFormColumns(option.columns, 'add'))
        : { ...data }
    dialogVisible.value = true
    return data
  }

  const runApiAction = async (
    fn: ((rowData: AnyObject) => unknown) | undefined,
    submitData: AnyObject,
    loadingRef: Ref<boolean>,
    closeRef: Ref<boolean>
  ): Promise<void> => {
    if (!fn) {
      // api 未配置时直接关闭弹窗，不触发刷新，避免给用户"已保存"的错觉
      closeRef.value = false
      return
    }
    loadingRef.value = true
    try {
      const result = await fn(submitData)
      if (result === false) return // 阻断：保持打开
      closeRef.value = false
      onRefresh()
    } catch {
      // 异常：保持打开
    } finally {
      loadingRef.value = false
    }
  }

  const handleSubmit = (submitData: AnyObject) =>
    runApiAction(
      crudMode.value === 'add' ? getOption().api.add : getOption().api.edit,
      submitData,
      dialogLoading,
      dialogVisible
    )

  const handleDel = (row: AnyObject) =>
    runApiAction(getOption().api.del, row, delLoading, delVisible)

  return {
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
  }
}
