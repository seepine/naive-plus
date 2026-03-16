---
permalink: /form/options
---

# np-form 字典选项

通过 `options` 指定选项，具体查看示例代码用法。

<demo src="../__demos__/options.vue"></demo>

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| options | 选项，支持 `radio/checkbox/select/cascader/autoComplete/transfer/tree` 类型 | `Array<any> / (data)=>Promise<Array<any>>` | - |
