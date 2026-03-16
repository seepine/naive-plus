import { throttle } from 'lodash-es'
import {
  isRef,
  onMounted,
  onUnmounted,
  type ComponentPublicInstance,
  type Ref,
} from 'vue'

/**
 * 监听容器尺寸变化
 * @param container 容器对象
 * @param callback 回调
 * @param opts 配置参数
 */
export const useResizeObserver = (
  container: Ref<ComponentPublicInstance> | Element,
  callback: (entries: ResizeObserverEntry, observer: ResizeObserver) => void,
  opts?: {
    throttleDelay?: number
  }
) => {
  let observer: ResizeObserver
  const { throttleDelay = 50 } = opts || {}
  onMounted(() => {
    observer = new ResizeObserver(
      throttle(
        entries => {
          const entry = entries[0]
          callback(entry, observer)
        },
        throttleDelay,
        {
          leading: true,
          trailing: true,
        }
      )
    )
    observer.observe(isRef(container) ? container.value.$el : container)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
