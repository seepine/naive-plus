import type { PropType, ExtractPropTypes } from 'vue'
import type { NpComponentOptions } from '../../config-provider'
import type { NpLocaleOption } from '../../locale'

export const npConfigProviderProps = {
  /**
   * 各组件的默认 props 覆盖，key 为组件名（PascalCase，去掉 `Np` 前缀）。
   * 与组件自身 prop 同名时，组件 prop 优先级更高。
   * 未传时继承外层 `NpConfigProvider`，显式传入时整体替换外层配置。
   */
  componentOptions: {
    type: Object as PropType<NpComponentOptions>,
  },
  /**
   * 内置文案语言或自定义语言包。
   * 传 `'zh'` / `'en'` 时使用内置语言包，传自定义语言包对象时直接使用该语言包，
   * 只覆盖部分字段时其余字段沿用内置语言包。
   * 未传时继承外层 `NpConfigProvider`，无外层时回落到 `'zh'`。
   */
  locale: {
    type: [String, Object] as PropType<NpLocaleOption>,
  },
}

export type NpConfigProviderProps = ExtractPropTypes<
  typeof npConfigProviderProps
>
