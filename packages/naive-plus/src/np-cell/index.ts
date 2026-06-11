import { withInstall } from '../utils'
import _Cell from './src/np-cell.vue'

export const NpCell = withInstall(_Cell)
export default NpCell

export * from './src/props'
export { NpCellGroup } from '../np-cell-group'
export type {
  NpCellGroupKey,
  NpCellGroupKeys,
  NpCellOption,
  NpCellGroupProps,
} from '../np-cell-group'
