import { withInstall } from '../utils'
import _Cell from './src/np-cell.vue'
import _CellGroup from './src/np-cell-group.vue'

export const NpCell = withInstall(_Cell)
export const NpCellGroup = withInstall(_CellGroup)
export default NpCell

export * from './src/props'
