---
permalink: /en/form/upload/
lang: en-US
---

# np-form File Upload

By setting `type: 'upload'`, the file upload component can be used in the form, which is internally built on `np-upload`.

The `v-model` value is of type `string[]`, where each item is a JSON string of `{name, url, type}` by default. When `listType` is `image-card` and `urlOnly` is `true`, each item only stores the file's `url` string.

<demo src="../__demos__/upload.en.vue"></demo>

## Component Configuration

### FormColumn Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| type | Set to `'upload'` | string | - |
| props | NUpload props, passed through to `n-upload` | [NUpload Props](https://www.naiveui.com/en-US/os-theme/components/upload#Upload-Props) | - |
| urlOnly | Only effective when `listType: 'image-card'`, value is simplified to an array of url strings | boolean | false |
| defaultValue | Default file list | string[] | - |
| onChange | File list change event | `(value: string[], ctx) => void` | - |
