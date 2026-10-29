import { withInstall } from '../utils'
import _ConfigProvider from './src/np-config-provider.vue'

export const NpConfigProvider = withInstall(_ConfigProvider)
export default NpConfigProvider

export * from './src/props'
export type { NpComponentOptions } from '../config-provider'
// 内置多语言文案与类型
export { zhCN, enUS, npLocales, npLocaleInjectionKey } from '../locale'
export type {
  NpLocale,
  NpLocaleMessages,
  NpLocaleMessagesInput,
  NpLocaleOption,
} from '../locale'
// 各组件的全局配置类型由组件自身定义，这里统一再导出一份
export type { NpButtonConfigProps } from '../np-button'
export type { NpCellConfigProps } from '../np-cell'
export type { NpCellGroupConfigProps } from '../np-cell-group'
export type { NpCheckboxConfigProps } from '../np-checkbox'
export type { NpFilterConfigProps } from '../np-filter'
export type {
  NpFormConfigProps,
  NpFormColumnConfigProps,
  NpFormFooterConfigProps,
} from '../np-form'
export type { NpRadioConfigProps } from '../np-radio'
export type {
  NpTableConfigProps,
  NpTableColumnConfigProps,
  NpTableColumnFormConfigProps,
  NpTableOperationConfigProps,
} from '../np-table'
export type { NpUploadConfigProps } from '../np-upload'
