import type { App } from 'vue'
import { NpButton } from './np-button'
import { NpCheckbox } from './np-checkbox'
import { NpRadio } from './np-radio'
import { NpForm } from './np-form'
import { NpUpload } from './np-upload'
// import { CRow } from './c-row'
// import { CCol } from './c-col'
// import { CForm } from './c-form'

export * from './np-button'
export * from './np-checkbox'
export * from './np-radio'
export * from './np-form'
export * from './np-upload'
// export * from './c-row'
// export * from './c-col'
// export * from './c-form'

export * from './types'
export * from './utils'

const components = [NpButton, NpCheckbox, NpRadio, NpForm, NpUpload]
export const ComponentNames = components.map(item => item.name)

export function install(app: App) {
  components.forEach(item => {
    if (item.install!) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export default {
  install,
}
