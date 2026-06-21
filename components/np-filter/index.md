---
url: /components/np-filter/index.md
---
# NpFilter

表格列筛选组件，提供两级筛选交互。

## 基础用法

```vue
<script setup lang="tsx">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

const items = [
  {
    label: '状态',
    key: 'status',
    options: [
      {
        label: '进行中',
        value: 'ongoing',
      },
      { label: '已暂停', value: 'paused' },
      { label: '已完成', value: 'done' },
    ],
  },
  {
    label: '优先级',
    key: 'priority',
    searchable: true,
    multiple: false,
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
  },
  {
    label: '创建人',
    key: 'creator',
    searchable: true,
    options: [
      { label: '张三', value: 'zhangsan' },
      { label: '李四', value: 'lisi' },
      { label: '王五', value: 'wangwu' },
    ],
  },
]

const handleChange = (newParams: Record<string, any>) => {
  console.log('filter change:', newParams)
}
</script>

<template>
  <div>
    <NpFilter v-model:params="params" :items="items" @change="handleChange">
      <n-button>点击筛选</n-button>
    </NpFilter>

    <pre>{{ JSON.stringify(params, null, 2) }}</pre>
  </div>
</template>
```

## 分组选项

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

const items = [
  {
    label: '优先级',
    key: 'priority',
    searchable: true,
    options: [
      { title: '紧急', options: [{ label: '高', value: 'high' }] },
      {
        title: '普通',
        options: [
          { label: '中', value: 'medium' },
          { label: '低', value: 'low' },
        ],
      },
    ],
  },
]

const handleChange = (newParams: Record<string, any>) => {
  console.log('filter change:', newParams)
}
</script>

<template>
  <div>
    <NpFilter v-model:params="params" :items="items" @change="handleChange">
      <n-button>点击筛选</n-button>
    </NpFilter>

    <pre>{{ JSON.stringify(params, null, 2) }}</pre>
  </div>
</template>
```

## 弹出位置

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const leftParams = ref({})
const rightParams = ref({})

const items = [
  {
    label: '状态',
    key: 'status',
    options: [
      { label: '进行中', value: 'ongoing' },
      { label: '已暂停', value: 'paused' },
      { label: '已完成', value: 'done' },
    ],
  },
  {
    label: '优先级',
    key: 'priority',
    multiple: false,
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
  },
]
</script>

<template>
  <div style="display: flex; gap: 16px; justify-content: space-between">
    <div>
      <NpFilter v-model:params="leftParams" :items="items" placement="right">
        <n-button>向右侧弹出</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(leftParams, null, 2) }}</pre>
    </div>

    <div style="text-align: right">
      <NpFilter v-model:params="rightParams" :items="items" placement="left">
        <n-button>向左侧弹出</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(rightParams, null, 2) }}</pre>
    </div>
  </div>
</template>
```

## Props

| 参数     | 说明         | 类型                                    | 默认值    |
| -------- | ------------ | --------------------------------------- | --------- |
| params   | 筛选参数     | `Record<string, any>`                   | `{}`      |
| options  | 筛选选项配置 | `FilterOption[]`                        | `[]`      |
| trigger  | 触发方式     | `'click' \| 'hover'`                    | `'click'` |
| placement | 弹出位置    | `'left' \| 'right'`                     | -         |

## FilterOption

| 参数       | 说明                    | 类型                                             | 默认值  |
| ---------- | ----------------------- | ------------------------------------------------ | ------- |
| label      | 分类标题                | `string \| () => VNode`                          | -       |
| key        | 对应 params 的 key      | `string`                                         | -       |
| icon       | 分类图标                | `VNode \| () => VNode`                           | -       |
| multiple   | 是否支持多选，默认 true | `boolean`                                        | `true`  |
| searchable | 是否支持搜索            | `boolean`                                        | `false` |
| options    | 选项配置                | `Array<ParamsOption> \| Array<{title, options}>` | -       |

## Events

| 事件名        | 说明              | 参数                                    |
| ------------- | ----------------- | --------------------------------------- |
| change        | 筛选变化时触发    | `(params: Record<string, any>) => void` |
| update:params | params 更新时触发 | `(params: Record<string, any>) => void` |
