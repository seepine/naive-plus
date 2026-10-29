import { isPlainObject } from 'lodash-es'
import {
  npLocales,
  zhCN,
  type NpLocaleMessages,
  type NpLocaleOption,
} from '../locale'
import type { AnyObject } from '../types'

/**
 * 深合并两个对象：值为普通对象时递归合并，其余情况直接覆盖
 * 覆盖值为 `undefined` 时视为未覆盖
 */
const mergeDeep = (base: AnyObject, override: AnyObject): AnyObject => {
  const result: AnyObject = { ...base }
  Object.entries(override).forEach(([key, value]) => {
    if (value === undefined) return
    const baseValue = result[key]
    result[key] =
      isPlainObject(baseValue) && isPlainObject(value)
        ? mergeDeep(baseValue, value)
        : value
  })
  return result
}

/**
 * 将 `locale` 配置解析为完整语言包
 *
 * - 传入语言标识时取内置语言包，未知标识回落到简体中文
 * - 传入自定义语言包时与内置语言包深合并，未覆盖的字段沿用简体中文
 * - 未传时返回 `undefined`，由调用方决定回落策略
 */
export const resolveLocale = (
  locale?: NpLocaleOption
): NpLocaleMessages | undefined => {
  if (!locale) return undefined
  if (typeof locale === 'string') return npLocales[locale] ?? zhCN
  return mergeDeep(zhCN, locale) as NpLocaleMessages
}
