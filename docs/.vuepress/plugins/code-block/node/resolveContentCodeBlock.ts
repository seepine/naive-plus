import type { Page } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { readSource } from '.'

const demoRegExp = /<demo\b([^>]*)><\/demo>/g
const srcRegExp = /\bsrc=(["'])(.*?)\1/

export const resolveContentCodeBlock = (page: Page) => {
  if (!page.filePath) return

  const dirPath = path.dirname(page.filePath)

  page.content = page.content.replace(demoRegExp, (raw, attrs: string) => {
    const src = attrs.match(srcRegExp)?.[2]
    if (!src) return raw

    const compPath = path.resolve(dirPath, src)
    const source = readSource(compPath)
    const lang = path.extname(source.name).slice(1) || 'vue'

    return `\n\n\`\`\`${lang}\n${source.rawCode.trimEnd()}\n\`\`\`\n`
  })
}
