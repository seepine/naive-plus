---
permalink: /components/np-radio
---

# np-radio 单选框

对 `n-radio-group` 进行封装，扩展了异步选项能力，并支持按钮组形态。

## 基础用法

通过 `options` 指定选项，通过 `v-model` 双向绑定值。

<demo src="../__demos__/basic.vue"></demo>

## 按钮组

设置 `button` 以使用按钮组样式。

<demo src="../__demos__/button-group.vue"></demo>

## 异步选项

选项 `options` 支持异步方法，例如一般会从后端接口获取字典。

<demo src="../__demos__/async.vue"></demo>

## 异步计算选项

选项 `options` 支持异步计算方法，例如根据不同类型需要从后端不同接口获取。

<demo src="../__demos__/computed.vue"></demo>

## 自定义字段名

通常我们会从后端接口获取数据，但数据类型并不一定是 `{label,value}` 的结构，此时可通过 `labelField` 和 `valueField` 指定选项字段名。

<demo src="../__demos__/keys.vue"></demo>

## 改变事件

通过 `change` 事件获取值变化。

<demo src="../__demos__/change.vue"></demo>

## 组件配置

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model | 选中值 | RadioGroupValue | - |
| options | 配置项 | AsyncValue<RadioOption[]> | - |
| labelField | 自定义标签字段名 | string | label |
| valueField | 自定义值字段名 | string | value |
| button | 是否按钮组样式 | boolean | false |
| loadingDelay | 加载出现延迟，当 options 异步时有效 | number | 250 |
| props | NRadioGroup 属性 | [NRadioGroup Props](https://www.naiveui.com/zh-CN/light/components/radio#RadioGroup-Props) | - |
| onChange | 改变事件 | (value: RadioGroupValue) => void | - |

### Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| update:modelValue | 值变更事件 | (value: RadioGroupValue) |
| change | 改变事件 | (value: RadioGroupValue) |

## 类型定义

组件导出以下类型定义

```ts
import type { NpRadioProps } from 'naive-plus'
```
