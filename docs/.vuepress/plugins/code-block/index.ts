import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import {
  resolveContentCodeBlock,
  resolveHtmlBlock,
  resolveScriptSetup,
  vitePageHMR,
} from './node'

export const codeBlockPlugin = (): Plugin => {
  const store = new Map<string, Map<string, string>>()

  return {
    name: '@seepine/vuepress-plugin-code-block',

    clientConfigFile: path.resolve(__dirname, './client/clientConfig.ts'),

    extendsMarkdown(md) {
      resolveHtmlBlock(md, store)
    },

    async extendsPage(page) {
      page.data.headers ??= page.headers ?? []
      resolveScriptSetup(page, store)
      resolveContentCodeBlock(page)
    },

    extendsBundlerOptions(bundlerOptions, app) {
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        const viteBundlerOptions = bundlerOptions as ViteBundlerOptions

        viteBundlerOptions.viteOptions ??= {}
        viteBundlerOptions.viteOptions.plugins ??= []
        viteBundlerOptions.viteOptions.plugins.push(vitePageHMR(app))
      }
    },
  }
}
