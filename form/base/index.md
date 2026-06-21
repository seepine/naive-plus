---
url: /form/base/index.md
---
# np-form 表单

配置驱动视图的表单，通过 `columns` 动态生成表单，用法简单且具有高扩展性。

## 基础用法

表单项主要通过 `label, key, type` 用以设置表单显示标签、表单属性和表单项类型。
更多配置在设置了 `type` 表单项类型后，根据实际类型的 `props` 而定。

```vue
<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref, h } from 'vue'

type User = {
  fullName?: string
  tel?: number
  age?: number
  gender?: 'man' | 'feman'
  hobby?: Array<'唱' | '跳' | 'rapper'>
}

const data = ref<User>({
  hobby: ['唱'],
})

const option: FormOption<User> = {
  onSubmit: async form => {
    console.log('点击了提交', form)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  onReset: form => {
    console.log('点击了重置', form)
  },
  columns: [
    {
      label: '姓名',
      key: 'fullName',
    },
    {
      label: '电话',
      key: 'tel',
      type: 'number',
    },
    {
      label: '年龄',
      key: 'age',
      // type 声明内部使用的组件，例如 number 为 naive-ui 的 n-input[type=number] 组件
      type: 'number',
      // 透传给组件的属性，拥有哪些属性可查看 naive-ui 的 InputProps
      props: {
        min: 0,
        max: 99,
      },
      // 透传给组件的插槽，拥有哪些插槽可查看 naive-ui 的 InputSlots
      slots: {
        suffix: () => [h('span', null, '岁')],
      },
    },
    {
      label: '性别',
      key: 'gender',
      type: 'radio',
      defaultValue: 'man',
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
    },
    {
      label: '喜好',
      key: 'hobby',
      type: 'checkbox',
      options: ['唱', '跳', 'rapper'],
    },
  ],
}
</script>
```

## 组件配置

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| option | 配置参数 | [FormOption](#formoption) | - |

## 类型定义

组件导出以下类型定义

```ts
import type { FormOption } from 'naive-plus'
```

### FormOption

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| columns | 表单项 | Array<[FormColumn](#formcolumn)> | - |
| onSubmit | 提交事件 | `(data)=>Promise<void>` | - |
| onReset | 重置事件 | `(data)=>Promise<void>` | - |
| props | 表单属性 | object | - |

### FormColumn

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | 字段标签名称 | string / VNode | - |
| key | 表单字段名称 | string | - |
| type | 表单项类型 | string / `(data)=>VNode` | - |
| defaultValue | 表单项默认值 | any | - |
| options | 字典项，例如 checkbox、select 等 | `Array<any>` / `()=>Promise<Array<any>>` | - |
| props | 组件 Props，会透传给实际组件 | object | - |
| formItemProps | 表单项 Props，会透传给 `n-form-item` | object | - |
