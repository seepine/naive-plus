import { computed, defineComponent, onUnmounted, ref } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npButtonProps } from './props'
import { NButton, NSpin } from 'naive-ui'
import { throttle } from 'lodash-es'
import { runAsync } from '../../utils'

const { name, bemClass } = useCreate('np-button')

export default defineComponent({
  name,
  props: npButtonProps,
  setup(props, { expose, slots }) {
    const loading = ref(false)

    let timer: ReturnType<typeof setTimeout> | undefined
    const handleClick = throttle(
      (e: MouseEvent) => {
        if (timer !== undefined) {
          return
        }
        if (props.click === undefined) {
          props.onClick?.(e)
          return
        }

        timer = setTimeout(() => {
          loading.value = true
        }, props.loadingDelay)
        runAsync(props.click, e).finally(() => {
          clearTimeout(timer)
          timer = undefined
          loading.value = false
        })
      },
      props.throttleDelay,
      {
        leading: true,
        trailing: false,
      }
    )

    onUnmounted(() => {
      if (timer !== undefined) {
        clearTimeout(timer)
      }
      handleClick.cancel()
    })

    const buttonRef = ref<InstanceType<typeof NButton>>()

    expose(
      new Proxy(
        {},
        {
          get(_, p) {
            if (p === 'click') {
              return handleClick
            }
            return ((buttonRef.value || {}) as any)[p]
          },
          has(_, p) {
            if (p === 'click') {
              return true
            }
            return p in (buttonRef.value || {})
          },
        }
      )
    )

    const renderContent = () => {
      const slotNodes = Object.keys(slots).map(slotName => slots[slotName]?.())
      if (loading.value || props.props?.loading === true) {
        return (
          <NSpin
            size={14}
            style={
              props.type === 'default'
                ? undefined
                : '--n-color: var(--n-text-color-hover);'
            }
          >
            {slotNodes}
          </NSpin>
        )
      }
      return slotNodes
    }

    const isSecondary = computed(() => {
      return (
        props.type === 'default' &&
        props.props?.ghost !== true &&
        props.props?.dashed !== true
      )
    })

    const style = computed(() => {
      const _style = {
        '--n-color-focus': 'var(--n-color)',
        '--n-text-color-focus': 'var(--n-text-color)',
        ...props.style,
      }
      if (props.props?.block) {
        _style.flex = 1
      }
      return _style
    })

    return () => (
      <NButton
        ref={buttonRef}
        class={bemClass.value}
        style={style.value}
        type={props.type}
        secondary={isSecondary.value}
        {...props.props}
        disabled={loading.value || props.props?.disabled}
        onClick={handleClick}
      >
        {renderContent()}
      </NButton>
    )
  },
})
