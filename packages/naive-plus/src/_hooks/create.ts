import { ref, watch, type Ref } from 'vue'

const prefixName = ``

/**
 *
 * @param componentName 组件名，例如 button
 * @returns
 */
export const useCreate = (
  componentName: string,
  args?: Ref<{ [x: string]: any }>
) => {
  // 例如 c-button
  const name = `${prefixName ? `-${prefixName}` : ''}${componentName}`
  /**
   * const { name, bemClass } = useCreate('back-top', toRef({ visible }))
   * // name = 'prefix-back-top'
   * // bemClass = 'prefix-back-top prefix-back-top-visible'
   */
  const bemClass = ref(name)
  watch(
    () => args,
    () => {
      const extClass = Object.keys(args?.value || {})
        .filter(key => !!args?.value[key])
        .map(key => `${name}-${key}`)
        .join(' ')
      bemClass.value = `${name} ${extClass}`
    },
    {
      immediate: true,
      deep: true,
    }
  )
  return {
    prefixName,
    name,
    bemClass,
  }
}
