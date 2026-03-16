import {
  isRef,
  ref,
  shallowRef,
  watch,
  watchEffect,
  type ComputedRef,
  type Ref,
  type ShallowRef,
  type UnwrapRef,
} from 'vue'
import { isComputed, isFunction, isPromise } from './is'
import type { AsyncValue } from '../types'
import { throttle } from 'lodash-es'

/**
 * 执行对象，获取真正的值
 * @param val 值或函数或promise
 * @param args 可传参
 * @returns promise
 *
 */
export const runAsync = async <T = any>(val: any, ...args: any): Promise<T> => {
  if (isFunction(val)) {
    const result = val(...args)
    return runAsync(result)
  }
  if (isPromise(val)) {
    return val.then((resolvedResult: any) => runAsync(resolvedResult))
  }
  return Promise.resolve(val)
}

type Fn = () => void
type AsyncComputedOnCancel = (cancelCallback: Fn) => void
interface AsyncComputedOptions {
  /**
   * Should value be evaluated lazily
   *
   * @defaultValue false
   */
  lazy?: boolean
  /**
   * Ref passed to receive the updated of async evaluation
   */
  evaluating?: Ref<boolean>
  /**
   * Use shallowRef
   *
   * @defaultValue true
   */
  shallow?: boolean
  /**
   * 触发变化时重置为初始值
   */
  resetInitialStateEffect?: boolean
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
}

/**
 * 支持异步的计算属性
 * @param evaluationCallback 函数
 * @param initialState 初始值
 * @param optionsOrRef 配置
 * @returns ref
 */
export const computedAsync = <T>(
  evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>,
  initialState: T,
  optionsOrRef?: Ref<boolean> | AsyncComputedOptions
): ShallowRef<T> | Ref<UnwrapRef<T>> => {
  let options
  if (isRef(optionsOrRef)) {
    options = {
      evaluating: optionsOrRef,
    }
  } else {
    options = optionsOrRef || {}
  }
  const {
    lazy = false,
    evaluating,
    shallow = true,
    resetInitialStateEffect = false,
    onError = () => {},
  } = options

  const started = ref(!lazy)
  const current = shallow ? shallowRef(initialState) : ref(initialState)
  let counter = 0
  watchEffect(async onInvalidate => {
    if (!started.value) {
      started.value = true
      return
    }
    if (resetInitialStateEffect) {
      current.value = initialState
    }
    counter++
    const counterAtBeginning = counter
    let hasFinished = false
    if (evaluating) {
      Promise.resolve().then(() => {
        evaluating.value = true
      })
    }
    try {
      const result = await evaluationCallback(cancelCallback => {
        onInvalidate(() => {
          if (evaluating) evaluating.value = false
          if (!hasFinished) cancelCallback()
        })
      })
      if (counterAtBeginning === counter) current.value = result
    } catch (e) {
      onError(e)
    } finally {
      if (evaluating && counterAtBeginning === counter) evaluating.value = false
      hasFinished = true
    }
  })
  return current
}

/**
 * 监听对象
 * @param callback 方法
 * @param watchObj 观察对象
 * @param opt 配置
 * @returns ref
 *
 * @code
 * ```
 * const count = ref(5)
 * const res = watchAsync(count, async ()=>{
 *    return 2 * count.value
 * })
 * ```
 */
export const watchAsync = <T>(
  watchObj: any,
  callback: AsyncValue<T>,
  opt?: {
    defaultValue?: T
    deep?: boolean
    immediate?: boolean
    throttleDelay?: number
  }
): Ref<UnwrapRef<T> | undefined> => {
  const data = ref<T | undefined>(opt?.defaultValue)
  let watchSource
  if (isComputed(watchObj) || isRef(watchObj)) {
    watchSource = watchObj
  } else {
    watchSource = () => watchObj
  }
  const { deep = true, immediate = true, throttleDelay = 100 } = opt || {}
  watch(
    watchSource,
    throttle(
      async () => {
        data.value = await runAsync(callback)
      },
      throttleDelay,
      { leading: true, trailing: true }
    ),
    {
      deep,
      immediate,
    }
  )
  return data
}

export const watchThrottle = <T>(
  watchObj: Ref<T> | ComputedRef<T> | T,
  callback: (data: T) => void,
  opt?: {
    deep?: boolean
    immediate?: boolean
    throttleDelay?: number
  }
) => {
  let watchSource
  let isProxy = false
  if (isComputed(watchObj) || isRef(watchObj)) {
    watchSource = watchObj
    isProxy = true
  } else {
    watchSource = () => watchObj
  }

  watch(
    watchSource,
    throttle(
      async () => {
        // @ts-ignore
        callback(isProxy ? watchObj.value : watchObj)
      },
      opt?.throttleDelay || 100,
      { leading: true, trailing: true }
    ),
    {
      deep: opt?.deep,
      immediate: opt?.immediate,
    }
  )
}
