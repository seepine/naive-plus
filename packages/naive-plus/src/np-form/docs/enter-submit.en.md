---
permalink: /en/form/enter-submit/
lang: en-US
---

# np-form Enter to Submit

Pressing the Enter key on a single-line input in the form will trigger form submission.

## last mode

Submit only when pressing Enter on the last form field.

<demo src="../__demos__/enter-submit-last.en.vue"></demo>

## all mode

Submit when pressing Enter on any form field.

<demo src="../__demos__/enter-submit-all.en.vue"></demo>

## false mode

Disable Enter to submit.

<demo src="../__demos__/enter-submit-false.en.vue"></demo>

## Component Configuration

| Prop               | Description               | Type                       | Default   |
| ------------------ | ------------------ | -------------------------- | -------- |
| enterSubmitMode | How Enter triggers form submit | `'last' \| 'all' \| false` | `false` |
