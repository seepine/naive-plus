---
permalink: /en/components/np-upload/
lang: en-US
---

# np-upload Upload

A wrapper around `n-upload` that provides two-way binding of the file list via `v-model`.

The `v-model` value is of type `string[]`, where each item is a JSON string of `{name, url, type}` by default. When `listType` is `image-card` and `urlOnly` is `true`, each item only stores the file's `url` string.

## Basic Usage

Bind the file list with `v-model` and pass `n-upload` props through `props`.

<demo src="../__demos__/basic.en.vue"></demo>

## Custom Upload Area

Customize the trigger area through the default slot, e.g. to implement image card upload with `listType: 'image-card'`.

<demo src="../__demos__/custom.en.vue"></demo>

## urlOnly Mode

When `listType` is `image-card`, set `urlOnly` to `true` and the `v-model` value will be simplified to an array of url strings.

<demo src="../__demos__/url-only.en.vue"></demo>

## Component Configuration

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| v-model | File list, each item is a JSON string of `{name, url, type}`; in `urlOnly` mode, each item is a url string | string[] | `[]` |
| urlOnly | Only effective when `listType: 'image-card'`, `v-model` value is simplified to an array of url strings | boolean | `false` |
| props | NUpload props | [NUpload Props](https://www.naiveui.com/en-US/os-theme/components/upload#Upload-Props) | - |
| onChange | File list change event, first argument is the `v-model` value, second is the actual fileList | `(value: string[], fileList: UploadFileInfo[]) => void` | - |

### Slots

| Slot | Description |
| ------ | ---- |
| default | Upload trigger area content |

## Types

The component exports the following type definitions:

```ts
import type { NpUploadProps } from 'naive-plus'
```
