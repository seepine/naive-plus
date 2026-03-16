---
permalink: /form/custom
---

# np-form 自定义类型

## 自定义类型

表单项 `type` 除了支持默认组件之外，也支持自定义 `VNode`。

<demo src="../__demos__/custom-type.vue"></demo>

## 完全自定义渲染

使用 `render` 完全自定义渲染，例如实现分组表单。

<demo src="../__demos__/custom-render.vue"></demo>

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 类型函数，只会渲染输入区域 | `(data: AnyObject)=>VNode` | - |
| render | 渲染函数，会渲染整个form-item | `(data: AnyObject)=>VNode` | - |
