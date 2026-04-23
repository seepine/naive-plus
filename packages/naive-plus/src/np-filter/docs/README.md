---
permalink: /components/np-filter/
---

# NpFilter

表格列筛选组件，提供两级筛选交互。

## 基础用法

<demo src="../__demos__/index.vue"></demo>

## 分组选项

<demo src="../__demos__/group.vue"></demo>

## 弹出位置

<demo src="../__demos__/placement.vue"></demo>

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
