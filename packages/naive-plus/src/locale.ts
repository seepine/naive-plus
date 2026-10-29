import type { InjectionKey, Ref } from 'vue'

/**
 * 组件内置多语言文案。
 *
 * 只包含组件内部硬编码、且适合统一多语言的文案。
 * 优先级：组件自身配置（如 `option.footer.submitBtn.text`）> `componentOptions` > 语言包。
 */
export interface NpLocaleMessages {
  Form: {
    footer: {
      /** 提交按钮文字 */
      submitBtnText: string
      /** 重置按钮文字 */
      resetBtnText: string
    }
    /** 文件上传未完成时的校验提示 */
    uploadPendingTip: string
  }
  Upload: {
    /** 上传失败提示前缀 */
    uploadFailedTip: string
    /** 未知错误提示 */
    unknownError: string
    /** 默认上传按钮文字 */
    uploadBtnText: string
  }
  Filter: {
    /** 清除所有筛选项的文字 */
    clearAllText: string
  }
  Table: {
    operation: {
      /** 操作列标题 */
      label: string
      /** 操作项「编辑」文字 */
      editLabel: string
      /** 操作项「删除」文字 */
      delLabel: string
    }
    display: {
      /** 列显隐设置弹窗标题 */
      title: string
      /** 最后一个显示的列被隐藏时的提示 */
      keepOneTip: string
    }
    search: {
      /** 搜索框占位文本 */
      placeholder: string
    }
    /** 顶部「添加」按钮文字 */
    addBtnText: string
    /** 新增 / 编辑弹窗文案 */
    dialog: {
      /** 新增弹窗标题 */
      addTitle: string
      /** 编辑弹窗标题 */
      editTitle: string
      /** 确认按钮文字 */
      confirmText: string
      /** 取消按钮文字 */
      cancelText: string
    }
    /** 删除确认弹窗文案 */
    deleteDialog: {
      /** 弹窗标题 */
      title: string
      /** 弹窗内容 */
      content: string
      /** 确认按钮文字 */
      confirmText: string
      /** 取消按钮文字 */
      cancelText: string
    }
  }
}

/**
 * 内置语言
 */
export type NpLocale = 'zh' | 'en'

/**
 * 简体中文文案
 */
export const zhCN: NpLocaleMessages = {
  Form: {
    footer: {
      submitBtnText: '提交',
      resetBtnText: '重置',
    },
    uploadPendingTip: '文件上传未完成',
  },
  Upload: {
    uploadFailedTip: '上传失败',
    unknownError: '未知错误',
    uploadBtnText: '上传文件',
  },
  Filter: {
    clearAllText: '清除所有筛选',
  },
  Table: {
    operation: {
      label: '操作',
      editLabel: '编辑',
      delLabel: '删除',
    },
    display: {
      title: '显示设置',
      keepOneTip: '至少保留一列显示',
    },
    search: {
      placeholder: '请输入关键词搜索',
    },
    addBtnText: '添加',
    dialog: {
      addTitle: '新增',
      editTitle: '编辑',
      confirmText: '确认',
      cancelText: '取消',
    },
    deleteDialog: {
      title: '确认删除',
      content: '确定要删除该条数据吗？此操作不可恢复。',
      confirmText: '确认删除',
      cancelText: '取消',
    },
  },
}

/**
 * 英文文案
 */
export const enUS: NpLocaleMessages = {
  Form: {
    footer: {
      submitBtnText: 'Submit',
      resetBtnText: 'Reset',
    },
    uploadPendingTip: 'Upload not finished',
  },
  Upload: {
    uploadFailedTip: 'Upload failed',
    unknownError: 'Unknown error',
    uploadBtnText: 'Upload file',
  },
  Filter: {
    clearAllText: 'Clear all filters',
  },
  Table: {
    operation: {
      label: 'Operation',
      editLabel: 'Edit',
      delLabel: 'Delete',
    },
    display: {
      title: 'Display Settings',
      keepOneTip: 'Keep at least one column visible',
    },
    search: {
      placeholder: 'Enter keyword to search',
    },
    addBtnText: 'Add',
    dialog: {
      addTitle: 'Create',
      editTitle: 'Edit',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    },
    deleteDialog: {
      title: 'Confirm Deletion',
      content:
        'Are you sure to delete this record? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    },
  },
}

/**
 * 语言到文案的映射
 */
export const npLocales: Record<NpLocale, NpLocaleMessages> = {
  zh: zhCN,
  en: enUS,
}

/**
 * `np-config-provider` 向后代组件注入语言文案时使用的 key。
 * 使用 `Ref` 包裹，以便语言切换时子组件能响应式更新。
 */
export const npLocaleInjectionKey: InjectionKey<Ref<NpLocaleMessages>> =
  Symbol('np-locale')
