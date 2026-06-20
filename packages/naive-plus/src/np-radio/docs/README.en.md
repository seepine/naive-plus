---
permalink: /en/components/np-radio/
lang: en-US
---

# np-radio Radio Group

A wrapper around `n-radio-group` that adds async option support and supports button-group style.

## Basic Usage

Specify options through `options`, and bind the value with `v-model`.

<demo src="../__demos__/basic.en.vue"></demo>

## Button Group

Set `button` to use the button-group style.

<demo src="../__demos__/button-group.en.vue"></demo>

## Async Options

The `options` prop supports an async function, e.g. for fetching dictionaries from a backend API.

<demo src="../__demos__/async.en.vue"></demo>

## Async Computed Options

The `options` prop supports an async computed function, e.g. for fetching different dictionaries from different APIs based on the type.

<demo src="../__demos__/computed.en.vue"></demo>

## Custom Field Names

Usually options are fetched from a backend, and the data structure is not always `{label, value}`. You can use `label-field` and `value-field` to specify option field names.

<demo src="../__demos__/keys.en.vue"></demo>

## Change Event

Get the value change via the `change` event.

<demo src="../__demos__/change.en.vue"></demo>

## Component Configuration

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| v-model | Selected value | RadioGroupValue | - |
| options | Options | AsyncValue<RadioOption[]> | - |
| label-field | Custom label field name | string | `label` |
| value-field | Custom value field name | string | `value` |
| button | Whether to use button-group style | boolean | `false` |
| loadingDelay | Loading delay in ms, effective when `options` is async | number | 250 |
| props | NRadioGroup props | [NRadioGroup Props](https://www.naiveui.com/en-US/light/components/radio#RadioGroup-Props) | - |
| onChange | Change event | `(value: RadioGroupValue) => void` | - |

### Events

| Event | Description | Callback |
| ------ | ---- | ---- |
| update:modelValue | Value change event | `(value: RadioGroupValue) => void` |
| change | Change event | `(value: RadioGroupValue) => void` |

## Types

The component exports the following type definitions:

```ts
import type { NpRadioProps } from 'naive-plus'
```
