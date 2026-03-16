import { type ComputedRef } from 'vue'
import type { AnyObject } from '../types'

const obj = Object.prototype.toString

export const isString = (val: any): val is string => {
  return obj.call(val) === '[object String]'
}

export function isNumeric(str: string): boolean {
  return /^[0-9]+$/.test(str)
}

/**
 * 是否函数
 * @param val 值
 * @returns bool
 */
export function isFunction(val: any): val is Function {
  return (
    obj.call(val) === '[object Function]' ||
    obj.call(val) === '[object AsyncFunction]'
  )
}

/**
 * 是否数组
 * @param val 值
 * @returns bool
 */
export const isArray = <T = any>(val: any): val is Array<T> => {
  return obj.call(val) === '[object Array]'
}

/**
 * 是否promise
 * @param val 值
 * @returns bool
 */
export function isPromise(val: any): val is Promise<any> {
  return obj.call(val) === '[object Promise]'
}

export const isObject = (val: any): val is AnyObject => {
  const type = typeof val
  return val != null && type === 'object'
}

export const isComputed = <T>(val: any): val is ComputedRef<T> => {
  if (typeof val !== 'object') {
    return false
  }
  return (
    val.__v_isRef === true && val.__v_isReadonly && val.effect !== undefined
  )
}
