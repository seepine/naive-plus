<!-- 组件全局默认配置，通过 provide 向子组件注入，本身不渲染任何 DOM -->
<template>
  <slot />
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { npConfigProviderInjectionKey } from '../../config-provider'
import { resolveLocale } from '../../_hooks/locale'
import { npLocaleInjectionKey, zhCN, type NpLocaleMessages } from '../../locale'
import { npConfigProviderProps } from './props'

const props = defineProps(npConfigProviderProps)

/** 外层 provider 注入的配置，内层未显式传入 componentOptions 时用于继承 */
const parentComponentOptions = inject(npConfigProviderInjectionKey, undefined)

provide(
  npConfigProviderInjectionKey,
  computed(() => props.componentOptions ?? parentComponentOptions?.value)
)

/** 外层 provider 注入的文案，内层未显式指定 locale 时用于继承 */
const parentLocale = inject(npLocaleInjectionKey, undefined)

provide(
  npLocaleInjectionKey,
  computed<NpLocaleMessages>(() => {
    // 未传时继承外层文案，无外层时回落到简体中文
    return resolveLocale(props.locale) ?? parentLocale?.value ?? zhCN
  })
)
</script>

<script lang="ts">
// 组件不渲染任何 DOM，根节点为插槽内容（fragment），无法自动继承 class / style 等属性
export default {
  inheritAttrs: false,
}
</script>
