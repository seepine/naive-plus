import type { ExtractPropTypes, PropType } from 'vue'
import type { TableOption } from './interface'

export const npTableProps = {
  option: {
    type: Object as PropType<TableOption<any>>,
    required: true,
    default: () => {
      return { columns: [], api: { fetch: async () => ({ items: [] }) } }
    },
  },
}

export type NpTableProps = ExtractPropTypes<typeof npTableProps>
