import type {
  ReComponentName,
  ReAttribute,
  ReWebTypesSource,
} from 'components-helper'
import helper from 'components-helper'
import { output, compRoot, compPackage } from '../utils/paths'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require(compPackage)

/**
 * 重写组件名称
 * @example BackTop -> back-top
 */
const reComponentName: ReComponentName = title => {
  return `${title
    .replace(/\B([A-Z])/g, '-$1')
    .replace(/[ ]+/g, '-')
    .toLowerCase()}`
}

/**
 * 重写组件属性
 * @example v-model -> model-value
 */
const reAttribute: ReAttribute = value => {
  switch (value) {
    case '':
    case '-':
    case '—':
      return undefined
    case 'v-model':
      return 'model-value'
    default:
      return value
  }
}

/**
 * 重写 web-types 来源
 * @example BackTop -> BackTop
 */
const reWebTypesSource: ReWebTypesSource = (title: string) => {
  const symbol = `${title
    .replace(/-/, ' ')
    .replace(/^\w|\s+\w/g, item => item.trim().toUpperCase())}`

  return { symbol }
}

export const generateHelper = async () => {
  helper({
    // 基本配置
    name: 'naive-plus',
    version,
    entry: `**/*.md`,
    outDir: output,
    space: 2,
    fastGlobConfig: {
      cwd: compRoot,
      absolute: true,
      onlyFiles: true,
    },

    // 解析配置
    reComponentName,
    reAttribute,
    reWebTypesSource,

    // 表头配置
    propsName: '属性',
    propsDescription: '说明',
    propsType: '类型',
    propsOptions: '可选值',
    propsDefault: '默认值',

    eventsName: '事件名',
    eventsDescription: '说明',

    slotsName: '插槽名',
    slotsDescription: '说明',
  })
}
