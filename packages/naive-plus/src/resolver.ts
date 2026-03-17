import type {
  ComponentResolver,
  SideEffectsInfo,
} from 'unplugin-vue-components/types'
import { kebabCase } from 'unplugin-vue-components'

const isSSR = Boolean(
  process.env.SSR ||
    process.env.SSG ||
    process.env.VITE_SSR ||
    process.env.VITE_SSG
)

const moduleType = isSSR ? 'lib' : 'es'

export interface NaivePlusResolverOptions {
  /**
   * import style css or scss along with components
   *
   * @default true
   */
  importStyle?: boolean | 'css' | 'scss'
}

function getSideEffects(
  dirName: string,
  options: NaivePlusResolverOptions
): SideEffectsInfo | undefined {
  const { importStyle = true } = options

  if (!importStyle || isSSR) return

  if (importStyle === 'scss') {
    return `naive-plus/${moduleType}/${dirName}/style/index.scss`
  } else {
    return `naive-plus/${moduleType}/${dirName}/style/index.css`
  }
}

/**
 * Resolver
 *
 */
export function NaivePlusResolver(
  options: NaivePlusResolverOptions = {}
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const kebabcase = kebabCase(name)
      if (kebabcase.startsWith('np-')) {
        return {
          name,
          from: `naive-plus/${moduleType}`,
          sideEffects: getSideEffects(kebabcase, options),
        }
      }
    },
  }
}
