import type { ExtractPropTypes } from 'vue'
import { makeStringProp } from '../../utils'

export const <%= camelCaseName %>Props = {
  /**
   * 类型定义
   */
  type: makeStringProp(''),
}

export type <%= pascalCaseName %>Props = ExtractPropTypes<typeof <%= camelCaseName %>Props>
