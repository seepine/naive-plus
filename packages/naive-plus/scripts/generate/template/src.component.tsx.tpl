import { defineComponent } from 'vue'
import { useCreate } from '../../_hooks/create'
import { <%= camelCaseName %>Props } from './props'

const { name, bemClass } = useCreate('<%= name %>')

export default defineComponent({
  name,

  props: <%= camelCaseName %>Props,

  emits: ['click'],

  setup() {
    return () => <button class={bemClass.value}><%= pascalCaseName %></button>
  },
})
