---
url: /form/submit-error/index.md
---
# np-form 提交异常反馈

提交（`onSubmit`）抛出异常时，错误信息默认会展示在底部按钮所在的表单项中，无需额外处理；设置 `footer.submitErrorFeedback: false` 可关闭该行为。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  onSubmit: async () => {
    // 模拟接口异常，异常信息会显示在提交按钮所在的表单项上
    await new Promise(resolve => setTimeout(resolve, 800))
    throw new Error('用户名已存在，请更换后重试')
  },
  columns: [
    { label: '用户名', key: 'username', defaultValue: 'admin' },
    { label: '手机号', key: 'tel', type: 'number' },
  ],
}
</script>
```

## 组件配置

### Footer Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| submitErrorFeedback | 提交（onSubmit）异常时，是否将错误信息展示在底部表单项的校验反馈中 | boolean | true |
