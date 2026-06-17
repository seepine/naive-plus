import { defineComponent, type PropType } from 'vue'
import type { CustomVNode } from '../../types'
import { isFunction, isString } from '../../utils'

export default defineComponent({
  name: 'RenderContent',
  props: {
    is: {
      type: [Object, Function, String] as PropType<string | CustomVNode>,
      required: false as const,
    },
  },
  setup(props) {
    const render = () => {
      if (props.is === undefined) {
        return undefined
      }
      if (isString(props.is)) {
        return <span>{props.is}</span>
      }
      if (isFunction(props.is)) {
        return props.is()
      }
      return props.is
    }
    return render
  },
})
