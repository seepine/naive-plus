---
permalink: /en/components/np-cell-group/
lang: en-US
---

# NpCellGroup

A cell group that batch-renders NpCell via the `options` config, with optional group title.

## Basic Usage

`options` supports all `np-cell` props.

<demo src="../__demos__/group.en.vue"></demo>

## Props

| Prop | Description | Type | Default |
| ------- | -------------- | --------------------- | ------ |
| title | Group title | `string` | - |
| options | Cell config list | `NpCellGroupOption[]` | `[]` |
| type | Control type on the left | `'checkbox' \| 'radio' \| 'switch'` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `medium` |
| bordered | Whether to show dividers | `boolean` | `false` |

## NpCellGroupOption

| Prop | Description | Type | Default |
| ------- | ---------------------- | ----------------------------------- | ------- |
| key | Option identifier | `string \| number` | current index |
| icon | Left icon | `VNode \| () => VNode` | - |
| label | Cell label | `string \| VNode \| () => VNode` | - |
| value | Cell value | `string \| VNode \| () => VNode` | - |
| description | Cell description | `string \| VNode \| () => VNode` | - |
| footer | Bottom content | `VNode \| () => VNode` | - |
| hover | Whether to enable hover state | `boolean` | - |
| arrow | Whether to show the right arrow | `boolean` | `false` |
| onClick | Click callback | `() => void` | - |

## Events

| Event | Description | Callback |
| ------ | ------------------ | ---------------------------- |
| change | Triggered when the selection changes | `(keys: NpCellGroupKeys, item: NpCellGroupOption) => void` |
| update:keys | Triggered when the control state changes | `(keys: NpCellGroupKeys) => void` |
