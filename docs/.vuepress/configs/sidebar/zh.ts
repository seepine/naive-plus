import type { SidebarConfig } from 'vuepress'

export const zh: SidebarConfig = {
  '/components': [
    {
      text: '组件',
      children: [
        {
          text: 'Button 按钮',
          link: '/components/np-button/',
        },
        {
          text: 'Radio 单选框',
          link: '/components/np-radio/',
        },
        {
          text: 'Checkbox 多选框',
          link: '/components/np-checkbox/',
        },
        {
          text: 'Upload 上传',
          link: '/components/np-upload/',
        },
      ],
    },
  ],
  '/form': [
    {
      text: '表单',
      children: [
        { text: '基础用法', link: '/form/base/' },
        { text: '所有类型', link: '/form/all/' },
        { text: '规则校验', link: '/form/rules/' },
        { text: '字典选项', link: '/form/options/' },
        { text: '显隐控制', link: '/form/display/' },
        { text: '文件上传', link: '/form/upload/' },
        { text: '改变事件', link: '/form/change/' },
        { text: '自定义类型', link: '/form/custom/' },
        { text: '自定义底部', link: '/form/footer/' },
      ],
    },
  ],
}
