---
permalink: /form/footer
---

# np-form 自定义底部

通过 `footer` 属性自定义底部。

<demo src="../__demos__/footer.vue"></demo>

## 组件配置

### FormOption Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| footer | 底部属性，`false` 则隐藏整个底部 | boolean / [FooterProps](#footer-props) | - |

### Footer Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| submitBtn | 提交按钮是否显示 | boolean | true |
| resetBtn | 重置按钮是否显示 | boolean | true |
| prefixRender | 前缀渲染函数 | `(data)=>VNode` | - |
| suffixRender | 后缀渲染函数 | `(data)=>VNode` | - |
