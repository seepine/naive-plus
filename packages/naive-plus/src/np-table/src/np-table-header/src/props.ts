import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumn } from '../../interface'
import type { NpFilterItem } from '../../../../np-filter'

export const npTableHeaderProps = {
  filters: {
    type: Array as PropType<NpFilterItem[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
  },
}

export type NpTableHeaderProps = ExtractPropTypes<typeof npTableHeaderProps>
