---
url: /components/np-checkbox/index.md
---
# np-checkbox 多选框

对 `n-checkbox-group` 进行封装，扩展了异步选项能力。

## 基础用法

通过 `options` 指定选项，通过 `v-model` 双向绑定值。

```vue
<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox v-model="value" :options="['北京', '上海', '广州']" />

  <!-- <div style="margin-top: 8px">支持全选</div>
  <np-checkbox
    v-model="value"
    :options="[
      { label: '全选', checkAll: true },
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ]"
  /> -->
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
```

## 异步选项

选项 `options` 支持异步方法，例如一般会从后端接口获取字典。

```vue
<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])

const options = async () => {
  // 模拟网络请求
  await new Promise<any[]>(resolve => setTimeout(resolve, 2000))
  return [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
  ]
}
</script>
```

## 异步计算选项

选项 `options` 支持异步计算方法，例如根据不同类型需要从后端不同接口获取。

```vue
<template>
  <div>
    {{ value }}
  </div>
  <div>
    <np-button
      :type="type === '福建' ? 'primary' : undefined"
      @click="() => (type = '福建')"
    >
      福建
    </np-button>
    <np-button
      :type="type === '广东' ? 'primary' : undefined"
      @click="() => (type = '广东')"
    >
      广东
    </np-button>
  </div>
  <np-checkbox v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])

const type = ref('福建')

const options = async () => {
  return type.value === '福建'
    ? await new Promise<any[]>(resolve => {
        setTimeout(() => resolve(['福州', '厦门', '龙岩', '三明']), 1500)
      })
    : await new Promise<any[]>(resolve => {
        setTimeout(() => resolve(['广州', '深圳', '珠海']), 1500)
      })
}
</script>
```

## 自定义字段名

通常我们会从后端接口获取数据，但数据类型并不一定是 `{label,value}` 的结构，此时可通过 `keys` 指定选项字段名

```vue
<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox
    v-model="value"
    :options="[
      { name: '北京', id: 'beijing' },
      { name: '上海', id: 'shanghai' },
      { name: '广州', id: 'guangzhou' },
    ]"
    value-field="id"
    label-field="name"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
```

## 改变事件

通过 `change` 事件获取值变化。

```vue
<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox
    :options="[
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ]"
    @change="(val: any) => (value = val)"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
```

## 组件配置

### Props

| 属性 | 说明     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| v-model | 选中值 | CheckboxGroupValue\[] | -      |
| options | 配置项 | AsyncValue\<CheckboxOption\[]> | - |
| keys | 自定义字段名 | {label:string, value:string} | { label: 'label', value: 'value' }   |
| loadingDelay| 加载出现延迟，当 options 异步时有效 | number | 250 |
| props| TCheckboxGroup 属性 | [TCheckboxGroup Props](https://tdesign.tencent.com/vue-next/components/checkbox?tab=api#checkboxgroup-props)  | - |
| onChange | 改变事件 |(value: T, context: CheckboxGroupChangeContext) | |

### Events

| 事件名 | 说明           | 参数                          |
| ------ | -------------- | ----------------------------- |
| change | 改变事件 |(value: T, context: CheckboxGroupChangeContext) |

## 类型定义

组件导出以下类型定义

```ts
import type { NpCheckboxProps } from 'naive-plus'
```
