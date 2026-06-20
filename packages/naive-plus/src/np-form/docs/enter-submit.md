---
permalink: /form/enter-submit/
---

# np-form 回车提交表单

支持在表单中的单行输入框按回车键触发表单提交。

## last 模式

仅在最后一个表单项按回车时提交。

<demo src="../__demos__/enter-submit-last.vue"></demo>

## all 模式

在任意表单项按回车都提交。

<demo src="../__demos__/enter-submit-all.vue"></demo>

## false 模式

禁用回车提交功能。

<demo src="../__demos__/enter-submit-false.vue"></demo>

## 组件配置

| 属性               | 说明               | 类型                       | 默认值   |
| ------------------ | ------------------ | -------------------------- | -------- |
| enterSubmitMode | 回车提交表单的方式 | `'last' \| 'all' \| false` | `false` |
