---
permalink: /en/form/custom/
lang: en-US
---

# np-form Custom Type

## Custom Type

In addition to built-in components, the `type` of a form field also supports custom `VNode`.

<demo src="../__demos__/custom-type.en.vue"></demo>

## Fully Custom Render

Use `render` to fully customize the render, e.g. for a grouped form.

<demo src="../__demos__/custom-render.en.vue"></demo>

## Component Configuration

### FormColumn Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| type | Type function, only renders the input area | `(data: AnyObject)=>VNode` | - |
| render | Render function, renders the entire form-item | `(data: AnyObject)=>VNode` | - |
