import { withInstall } from '../utils'
import _NpRadio from './src/np-radio'

export const NpRadio = withInstall(_NpRadio)
export default NpRadio

export * from './src/props'
