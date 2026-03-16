---
permalink: /components/np-upload
---

# np-upload 上传

对 `n-upload` 进行封装，提供了 `v-model` 双向绑定文件列表的能力。

`v-model` 绑定值为 `string[]` 类型，默认每项为 `{name, url, type}` 的 JSON 字符串。当 `listType` 为 `image-card` 且 `urlOnly` 为 `true` 时，每项仅保存文件的 `url` 字符串。

## 基础用法

通过 `v-model` 双向绑定文件列表，通过 `props` 传递 `n-upload` 的属性。

<demo src="../__demos__/basic.vue"></demo>

## 自定义上传区域

通过默认插槽自定义上传触发区域的内容，例如结合 `listType: 'image-card'` 实现图片卡片上传。

<demo src="../__demos__/custom.vue"></demo>

## urlOnly 模式

当 `listType` 为 `image-card` 时，设置 `urlOnly` 为 `true`，`v-model` 绑定值将简化为 url 字符串数组。

<demo src="../__demos__/url-only.vue"></demo>

## 组件配置

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model | 文件列表，每项为 `{name,url,type}` 的 JSON 字符串；`urlOnly` 模式下为 url 字符串 | string[] | [] |
| urlOnly | 仅在 `listType: 'image-card'` 时生效，`v-model` 值简化为 url 字符串数组 | boolean | false |
| props | NUpload 属性 | [NUpload Props](https://www.naiveui.com/zh-CN/os-theme/components/upload#Upload-Props) | - |
| onChange | 文件列表改变事件，第一个参数为 v-model 的值，第二个参数为实际的 fileList | `(value: string[], fileList: UploadFileInfo[]) => void` | - |

### Slots

| 插槽名 | 说明 |
| ------ | ---- |
| default | 上传触发区域内容 |

## 类型定义

组件导出以下类型定义

```ts
import type { NpUploadProps } from 'naive-plus'
```
