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

type LocaleKey = 'zh' | 'en' | 'custom'

const localeKey = ref<LocaleKey>('en')

/** Custom locale messages: only the fields to override are needed */
const customLocale: NpLocaleMessagesInput = {
  Form: {
    footer: { submitBtnText: 'Submit Now', resetBtnText: 'Clear' },
  },
  Table: {
    operation: { label: 'Actions' },
  },
}

const locale = computed<NpLocaleOption>(() =>
  localeKey.value === 'custom' ? customLocale : localeKey.value
)
/** Locale of naive-ui components, kept in sync with np components (naive-ui has no custom locale) */
const naiveLocale = computed(() => (localeKey.value === 'en' ? enUS : zhCN))

const formOption: FormOption = {
  columns: [{ label: 'Name', key: 'name' }],
}

const tableOption: TableOption = {
  api: {
    fetch: async () => ({
      items: [{ id: 1, name: 'Naive Plus' }],
      itemCount: 1,
    }),
  },
  columns: [{ key: 'name', label: 'Name' }],
  search: {},
}
</script>

<template>
  <NConfigProvider :locale="naiveLocale">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <NRadioGroup v-model:value="localeKey">
        <NRadioButton value="zh">中文</NRadioButton>
        <NRadioButton value="en">English</NRadioButton>
        <NRadioButton value="custom">Custom</NRadioButton>
      </NRadioGroup>
      <NpConfigProvider :locale="locale">
        <np-form :option="formOption" />
        <np-table :option="tableOption" />
      </NpConfigProvider>
    </div>
  </NConfigProvider>
</template>
