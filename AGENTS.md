# AGENTS.md

本文档旨在帮助 AI Agent 快速理解 `naive-plus` 项目结构、开发规范及常用命令，以便更高效地进行代码生成与协作。

## 1. 项目简介

`naive-plus` 是一个基于 **Vue 3** 和 **Naive UI** 的组件库项目，旨在提供更高级、更易用的业务组件。

## 2. 技术栈

- **核心框架**: Vue 3 (Composition API)
- **UI 基础**: Naive UI
- **语言**: TypeScript, TSX
- **构建工具**: Vite (文档/示例), Rollup (组件库构建)
- **包管理**: pnpm
- **测试**: Vitest

## 3. 目录结构

核心目录说明：

- `packages/naive-plus/`: 核心组件库代码
  - `src/`: 组件源码目录，每个组件一个独立文件夹
  - `scripts/`: 构建与生成脚本
- `docs/`: 文档站点 (VuePress)

## 4. 组件开发规范

### 4.1 组件路径与命名

- **路径**: `packages/naive-plus/src/<component-name>`
- **命名**:
  - 目录名/文件名: `kebab-case` (如 `np-button`)
  - 组件名: `PascalCase` (如 `NpButton`)
  - 前缀: `np-`

### 4.2 组件目录结构

每个组件应包含以下文件：

```text
np-example/
├── __demos__/          # 示例代码 (.vue)
├── __tests__/          # 单元测试 (.test.tsx)
├── docs/               # 组件文档 (README.md)
├── src/                # 源码
│   ├── np-example.tsx  # 组件实现 (使用 TSX)
│   └── props.ts        # Props 定义
├── style/              # 样式
│   └── index.scss      # 样式入口
└── index.ts            # 导出入口 (使用 withInstall)
```

### 4.3 编码规范

- **类型导入**: 需遵循 `verbatimModuleSyntax` 规范，使用 `import type { xxx } from 'xxx'` 导入类型。
- **Props**: 在 `props.ts` 中定义，使用 Vue 的 `ExtractPropTypes` 导出类型。
- **样式**: 使用 BEM 命名规范，配合 SCSS。
- **逻辑复用**: 使用 Composition API 和 Hooks。
- **表单集成**: 若组件需集成到 `np-form`，请更新 `packages/naive-plus/src/np-form/src/np-form-item.tsx` 中的 `COMPONENT_MAP` 及 `interface.ts`。

## 5. 常用命令

在项目根目录下运行：

- **安装依赖**: `pnpm install`
- **启动文档**: `pnpm docs:dev`
- **构建**: `pnpm ui:build`
- **Lint检查**: `pnpm lint:eslint`
- **格式化**: `pnpm lint:prettier`

## 6. Changeset

- 修改代码后，使用命令 `pnpm cs` 进行变更生成，再一并提交md文件
- 推送代码后，github action 会自动判断并创建pr

## 7. 注意事项

- 新增或修改组件后，请确保组件的文档和测试用例是否更新
- 新增或修改组件后，请使用 `code-simplifier` SKILL 简化代码
- 新增或修改组件后，请使用 `pnpm ui:test` 命令运行组件测试
- 新增或修改组件后，请运行 `pnpm ui:type-check` 和 `pnpm lint:eslint` 和 `pnpm lint:prettier` 三个命令，确保代码格式和规范没有问题
- 新增或修改文档或组件后，请运行 `pnpm ui:build && pnpm docs:dev` 构建并检查对应页面。
