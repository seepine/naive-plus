---
permalink: /en/components/np-checkbox/
lang: en-US
---

# np-checkbox Checkbox Group

A wrapper around `n-checkbox-group` that adds async option support.

## Basic Usage

Specify options through `options`, and bind the value with `v-model`.

<demo src="../__demos__/basic.en.vue"></demo>

## Async Options

The `options` prop supports an async function, e.g. for fetching dictionaries from a backend API.

<demo src="../__demos__/async.en.vue"></demo>

## Async Computed Options

The `options` prop supports an async computed function, e.g. for fetching different dictionaries from different APIs based on the type.

<demo src="../__demos__/computed.en.vue"></demo>

## Custom Field Names

Usually options are fetched from a backend, and the data structure is not always `{label, value}`. You can use `keys` to specify option field names.

<demo src="../__demos__/keys.en.vue"></demo>

## Change Event

Get the value change via the `change` event.

<demo src="../__demos__/change.en.vue"></demo>

## Component Configuration

### Props

| Prop | Description | Type | Default |
| ---- | -------- | ------ | ------ |
| v-model | Selected values | CheckboxGroupValue[] | - |
| options | Options | AsyncValue<CheckboxOption[]> | - |
| keys | Custom field names | {label: string, value: string} | `{ label: 'label', value: 'value' }` |
| loadingDelay | Loading delay in ms, effective when `options` is async | number | 250 |
| props | TCheckboxGroup props | [TCheckboxGroup Props](https://tdesign.tencent.com/vue-next/components/checkbox?tab=api#checkboxgroup-props) | - |
| onChange | Change event | `(value: T, context: CheckboxGroupChangeContext) => void` | - |

### Events

| Event | Description | Callback |
| ------ | -------------- | ----------------------------- |
| change | Change event | `(value: T, context: CheckboxGroupChangeContext) => void` |

## Types

The component exports the following type definitions:

```ts
import type { NpCheckboxProps } from 'naive-plus'
```
