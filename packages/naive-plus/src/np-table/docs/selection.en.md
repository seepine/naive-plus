---
permalink: /en/table/selection/
lang: en-US
---

# np-table Selection

Add `type: 'selection'` to `columns` to enable multi-select, and pass `checkedRowKeys` and `onUpdateCheckedRowKeys` via `option.props` to control the selected state.

> Note: `option` must be defined as a `computed` so that reactive updates of `checkedRowKeys` are synced to the table.

<demo src="../__demos__/selection.en.vue"></demo>
