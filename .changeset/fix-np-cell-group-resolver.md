---
'naive-plus': minor
---

refactor(cell): split `NpCellGroup` into its own `np-cell-group` directory

`NpCellGroup` now lives in `packages/naive-plus/src/np-cell-group/` alongside its own props, styles, and tests, matching the convention used by every other component. `np-cell` re-exports `NpCellGroup` (and the related types) so the public API is unchanged.

This also fixes the auto-import issue from #194: the `unplugin-vue-components` resolver now maps `NpCellGroup` to the existing `naive-plus/es/np-cell-group/` path and its `style/index.{css,scss}` entry, with no special-case mapping required.

To make per-component subpath imports (`naive-plus/es/<dir>`) work cleanly for both Node ESM and bundlers, the `exports` map has been tightened: `"./es/*": "./es/*/index.mjs"`. This keeps tree-shaking benefits (the resolver emits `naive-plus/es/<dir>` rather than the barrel) while resolving through Node ESM without requiring a `package.json` inside each component directory.