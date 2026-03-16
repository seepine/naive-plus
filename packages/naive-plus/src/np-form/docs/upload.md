---
permalink: /form/upload
---

# np-form 文件上传

通过设置 `type: 'upload'` 可在表单中使用文件上传组件，底层使用 `np-upload` 封装。

`v-model` 绑定值为 `string[]` 类型，默认每项为 `{name, url, type}` 的 JSON 字符串。当 `listType` 为 `image-card` 且 `urlOnly` 为 `true` 时，每项仅保存文件的 `url` 字符串。

<demo src="../__demos__/upload.vue"></demo>

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 设置为 `'upload'` | string | - |
| props | NUpload 属性，会透传给 `n-upload` | [NUpload Props](https://www.naiveui.com/zh-CN/os-theme/components/upload#Upload-Props) | - |
| urlOnly | 仅在 `listType: 'image-card'` 时生效，值简化为 url 字符串数组 | boolean | false |
| defaultValue | 默认文件列表 | string[] | - |
| onChange | 文件列表改变事件 | `(value: string[], ctx) => void` | - |
