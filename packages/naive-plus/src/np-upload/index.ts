import { withInstall } from '../utils'
import _NpUpload from './src/np-upload'

export const NpUpload = withInstall(_NpUpload)
export default NpUpload

export * from './src/props'
