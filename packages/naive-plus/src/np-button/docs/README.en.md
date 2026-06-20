---
permalink: /en/components/np-button/
lang: en-US
---

# NpButton

A wrapper around `n-button` that extends it with throttling and async capabilities.

## Basic Usage

The default click event is throttled.

<demo src="../__demos__/basic.en.vue"></demo>

## Async Button

Use the `:click` prop to replace the original `@click` event.

<demo src="../__demos__/async.en.vue"></demo>

## Button Types

<demo src="../__demos__/type.en.vue"></demo>

## Props

### Props

| Prop | Description | Type | Default |
| ---- | -------- | ------ | ------ |
| throttle-delay | Throttle delay in ms | number | 350 |
| loading-delay | Loading delay in ms | number | 250 |
| click | Click handler | `() => Promise<void>` | - |
| type | Theme style | `primary/danger/warning/success` | default |
| props | Other button props | object -> [Button Props](https://www.naiveui.com/en-US/light/components/button#Button-Props) | |

### Events

| Event | Description | Callback |
| ------ | -------------- | ----------------------------- |
| click  | Triggered on click | `() => void` |

### Slots

| Slot  | Description           |
| ------- | -------------- |
| default | Custom default content |

## Types

The component exports the following type definitions:

```ts
import type { NpButtonProps } from 'naive-plus'
```
