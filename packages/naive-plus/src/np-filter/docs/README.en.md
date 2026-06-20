---
permalink: /en/components/np-filter/
lang: en-US
---

# NpFilter

A table filter component that supports a two-level filter interaction.

## Basic Usage

<demo src="../__demos__/index.en.vue"></demo>

## Grouped Options

<demo src="../__demos__/group.en.vue"></demo>

## Placement

<demo src="../__demos__/placement.en.vue"></demo>

## Props

| Prop | Description | Type | Default |
| -------- | ------------ | --------------------------------------- | --------- |
| params | Filter params | `Record<string, any>` | `{}` |
| options | Filter option configs | `FilterOption[]` | `[]` |
| trigger | Trigger mode | `'click' \| 'hover'` | `'click'` |
| placement | Popover placement | `'left' \| 'right'` | - |

## FilterOption

| Prop | Description | Type | Default |
| ---------- | ----------------------- | ------------------------------------------------ | ------- |
| label | Category label | `string \| () => VNode` | - |
| key | Corresponding key in params | `string` | - |
| icon | Category icon | `VNode \| () => VNode` | - |
| multiple | Whether multi-select is supported (default `true`) | `boolean` | `true` |
| searchable | Whether search is supported | `boolean` | `false` |
| options | Option configs | `Array<ParamsOption> \| Array<{title, options}>` | - |

## Events

| Event | Description | Callback |
| ------------- | ----------------- | --------------------------------------- |
| change | Triggered when filters change | `(params: Record<string, any>) => void` |
| update:params | Triggered when params update | `(params: Record<string, any>) => void` |
