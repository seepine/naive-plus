---
permalink: /table/selection/
---

# np-table 多选

在 `columns` 中添加 `type: 'selection'` 列开启多选，通过 `option.props` 传入 `checkedRowKeys` 和 `onUpdateCheckedRowKeys` 控制选中状态。

> 注意：需将 `option` 定义为 `computed`，以保证 `checkedRowKeys` 的响应式更新能同步到表格。

<demo src="../__demos__/selection.vue"></demo>
