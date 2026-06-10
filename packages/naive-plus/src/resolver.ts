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

// Components that live inside another component's directory (e.g. grouped under
// `np-cell`) but are still exported with their own top-level name. The resolver
// must point them at the owning directory for both `from` and `sideEffects`.
const SUBCOMPONENT_DIRS: Record<string, string> = {
  'np-cell-group': 'np-cell',
}

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
        const dirName = SUBCOMPONENT_DIRS[kebabcase] ?? kebabcase
        return {
          name,
          from: `naive-plus/${moduleType}/${dirName}`,
          sideEffects: getSideEffects(dirName, options),
        }
      }
    },
  }
}
