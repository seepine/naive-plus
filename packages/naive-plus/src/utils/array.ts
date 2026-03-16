import { isObject } from './is'

/**
 * 属性名转换
 * @param arr 原始数组
 * @param keys 属性名，默认 { value: 'value', label: 'label' }
 * @returns 新数据
 */
export const arrayTransferByKeys = (
  arr: any[],
  keys?: {
    value?: string
    label?: string
  }
) => {
  const { label = 'label', value = 'value' } = keys || {}
  return arr.map((item: any) => {
    if (isObject(item)) {
      return {
        ...item,
        label: item[label],
        value: item[value],
      }
    }
    return {
      label: item,
      value: item,
    }
  })
}
