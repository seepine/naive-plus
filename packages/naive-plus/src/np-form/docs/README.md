---
permalink: /form/base
---

# np-form 表单

配置驱动视图的表单，通过 `columns` 动态生成表单，用法简单且具有高扩展性。

## 基础用法

表单项主要通过 `label, key, type` 用以设置表单显示标签、表单属性和表单项类型。
更多配置在设置了 `type` 表单项类型后，根据实际类型的 `props` 而定。

<demo src="../__demos__/basic.vue"></demo>

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
