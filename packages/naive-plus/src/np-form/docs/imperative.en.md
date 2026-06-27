---
permalink: /en/form/imperative/
lang: en-US
---

# np-form Imperative Methods

After getting the form instance via `ref`, you can imperatively call `submit`, `reset`, and `validateFields`.

- `submit`: trigger form submission manually. Behaves like the submit button — validates first, then runs `onSubmit`.
- `reset`: trigger form reset manually. Behaves like the reset button — clears validation and runs `onReset`.
- `validateFields`: validate the specified fields by name.

<demo src="../__demos__/imperative.en.vue"></demo>

## Component Configuration

### FormInst methods

| Method | Description | Type |
| ---- | ---- | ---- |
| submit | Submit the form manually | `() => Promise<void>` |
| reset | Reset the form manually | `() => Promise<void>` |
| validateFields | Validate the given fields | `(fields: string \| string[]) => Promise<void>` |
