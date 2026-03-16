export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NpButton: typeof import('naive-plus')['NpButton']
    NpCheckbox: typeof import('naive-plus')['NpCheckbox']
    NpRadio: typeof import('naive-plus')['NpRadio']
    NpForm: typeof import('naive-plus')['NpForm']
    NpUpload: typeof import('naive-plus')['NpUpload']
  }
}
