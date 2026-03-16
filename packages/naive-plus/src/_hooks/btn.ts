import type { AnyObject, Btn } from '../types'
import { computedAsync, runAsync } from '../utils'

export const useBtn = (opt?: Btn) => {
  const text = computedAsync(async () => {
    const res = await runAsync(opt?.text)
    return res === undefined ? '' : res
  }, '')

  const display = computedAsync(async () => {
    const res = await runAsync(opt?.display)
    return res === undefined ? true : res
  }, true)

  // const click = async data => {
  //   let res
  //   try {
  //     res = await run(opt?.onBefore, form.value)
  //   } catch (_) {
  //     return
  //   }
  //   if (res) {
  //     form.value = res
  //   }
  // }

  const onBefore = async (data: AnyObject) => {
    let res
    if (opt?.onBefore) {
      res = await runAsync(opt?.onBefore, data)
    }
    return res || data
  }

  const onAfter = async (data: AnyObject) => {
    let res
    if (opt?.onAfter) {
      res = await runAsync(opt?.onAfter, data)
    }
    return res || data
  }

  const onSubmit = async (data: AnyObject) => {
    let res
    if (opt?.onSubmit) {
      res = await runAsync(opt?.onSubmit, data)
    }
    return res || data
  }

  return {
    text,
    display,
    onBefore,
    onAfter,
    onSubmit,
    style: opt?.style,
  }
}
