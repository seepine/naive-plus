import type { SidebarConfig } from 'vuepress'

export const en: SidebarConfig = {
  '/en/components': [
    {
      text: 'Base Components',
      children: [
        { text: 'Button', link: '/en/components/np-button/' },
        { text: 'Radio', link: '/en/components/np-radio/' },
        { text: 'Checkbox', link: '/en/components/np-checkbox/' },
        { text: 'Upload', link: '/en/components/np-upload/' },
        { text: 'Filter', link: '/en/components/np-filter/' },
      ],
    },
    {
      text: 'Cell',
      children: [
        { text: 'Cell', link: '/en/components/np-cell/' },
        { text: 'CellGroup', link: '/en/components/np-cell-group/' },
      ],
    },
  ],
  '/en/form': [
    {
      text: 'Form',
      children: [
        { text: 'Basic Usage', link: '/en/form/base/' },
        { text: 'All Types', link: '/en/form/all/' },
        { text: 'Rules Validation', link: '/en/form/rules/' },
        { text: 'Dictionary Options', link: '/en/form/options/' },
        { text: 'Display Control', link: '/en/form/display/' },
        { text: 'File Upload', link: '/en/form/upload/' },
        { text: 'Change Event', link: '/en/form/change/' },
        { text: 'Custom Type', link: '/en/form/custom/' },
        { text: 'Custom Footer', link: '/en/form/footer/' },
        { text: 'Enter to Submit', link: '/en/form/enter-submit/' },
        { text: 'Imperative Methods', link: '/en/form/imperative/' },
      ],
    },
  ],
  '/en/table': [
    {
      text: 'Table',
      children: [
        { text: 'Basic Usage', link: '/en/table/base/' },
        { text: 'CRUD', link: '/en/table/crud/' },
        { text: 'Custom Operation Column', link: '/en/table/operation/' },
        { text: 'Filter', link: '/en/table/filter/' },
        { text: 'Selection', link: '/en/table/selection/' },
      ],
    },
  ],
}
