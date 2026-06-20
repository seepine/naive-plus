---
permalink: /en/form/footer/
lang: en-US
---

# np-form Custom Footer

Customize the footer through the `footer` prop.

<demo src="../__demos__/footer.en.vue"></demo>

## Component Configuration

### FormOption Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| footer | Footer config; set to `false` to hide the whole footer | boolean / [FooterProps](#footer-props) | - |

### Footer Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| submitBtn | Whether to show the submit button | boolean | true |
| resetBtn | Whether to show the reset button | boolean | true |
| prefixRender | Prefix render function | `(data)=>VNode` | - |
| suffixRender | Suffix render function | `(data)=>VNode` | - |
