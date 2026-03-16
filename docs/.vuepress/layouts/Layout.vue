<template>
  <n-config-provider
    :theme="themeConfig.theme"
    :theme-overrides="themeConfig.themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <ParentLayout />
  </n-config-provider>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import {
  lightTheme,
  darkTheme,
  NConfigProvider,
  zhCN,
  dateZhCN,
} from 'naive-ui'
import type { ConfigProviderProps } from 'naive-ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const isDark = ref(false)

const syncDark = () => {
  if (typeof document === 'undefined') return
  isDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  syncDark()
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        syncDark()
      }
    })
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  onUnmounted(() => observer.disconnect())
})

const themeConfig = computed<ConfigProviderProps>(() => {
  const primaryColor = isDark.value ? '#3C7EFF' : '#165DFF'
  const primaryColorHover = isDark.value ? '#306FFF' : '#4080FF'
  const primaryColorPressed = isDark.value ? '#689FFF' : '#0E42D2'
  return {
    theme: isDark.value ? darkTheme : lightTheme,
    themeOverrides: {
      common: {
        primaryColor,
        primaryColorHover,
        primaryColorPressed,
        primaryColorSuppl: primaryColorHover,
      },
      Layout: {
        color: isDark.value ? undefined : '#fcfcfc',
      },
      Tabs: {
        tabTextColorActiveSegment: primaryColor,
        tabTextColorHoverSegment: primaryColorHover,
      },
      Button: {
        waveOpacity: 0,
      },
    },
  }
})
</script>
