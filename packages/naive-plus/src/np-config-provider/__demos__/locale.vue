<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  NConfigProvider,
  NRadioButton,
  NRadioGroup,
  enUS,
  zhCN,
} from 'naive-ui'
import type { FormOption, TableOption } from 'naive-plus'
import type { NpLocaleMessagesInput, NpLocaleOption } from '../index'
import { NpConfigProvider } from '../index'

type LocaleKey = 'zh' | 'en' | 'ja'

const localeKey = ref<LocaleKey>('zh')

/** 自定义语言包：只需写需要覆盖的字段，其余字段沿用内置语言包 */
const customLocale: NpLocaleMessagesInput = {
  Form: {
    footer: { submitBtnText: '送信', resetBtnText: 'リセット' },
  },
  Table: {
    operation: { label: '操作' },
  },
}

const locale = computed<NpLocaleOption>(() =>
  localeKey.value === 'ja' ? customLocale : localeKey.value
)
/** naive-ui 组件的语言，保持与 np 组件一致（naive-ui 暂不支持自定义语言包） */
const naiveLocale = computed(() => (localeKey.value === 'en' ? enUS : zhCN))

const formOption: FormOption = {
  columns: [{ label: '姓名', key: 'name' }],
}

const tableOption: TableOption = {
  api: {
    fetch: async () => ({
      items: [{ id: 1, name: 'Naive Plus' }],
      itemCount: 1,
    }),
  },
  columns: [{ key: 'name', label: '名称' }],
  search: {},
}
</script>

<template>
  <NConfigProvider :locale="naiveLocale">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <NRadioGroup v-model:value="localeKey">
        <NRadioButton value="zh">中文</NRadioButton>
        <NRadioButton value="en">English</NRadioButton>
        <NRadioButton value="ja">日本語</NRadioButton>
      </NRadioGroup>
      <NpConfigProvider :locale="locale">
        <np-form :option="formOption" />
        <np-table :option="tableOption" />
      </NpConfigProvider>
    </div>
  </NConfigProvider>
</template>
