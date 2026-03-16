import type { App, Component } from 'vue'

// const camelizeRE = /-(\w)/g
// const camelize = (str: string) =>
//   str.replace(camelizeRE, (_, c) => c.toUpperCase())

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}
export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export const withInstall = <T extends Component>(
  options: T
): WithInstall<T> => {
  // @ts-ignore
  options.install = (app: App) => {
    const { name } = options
    if (name) {
      app.component(name, options)
      // app.component(camelize(`-${name}`), options)
    }
  }
  return options as WithInstall<T>
}
