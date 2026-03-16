/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */

const unknownProp = null
const numericProp = [Number, String]
const truthProp = {
  type: Boolean,
  default: true,
}
const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true,
})
const makeArrayProp = () => ({
  type: Array,
  default: () => [],
})
const makeNumberProp = (defaultVal: number) => ({
  type: Number,
  default: defaultVal,
})
const makeNumericProp = (defaultVal: number | string) => ({
  type: numericProp,
  default: defaultVal,
})
const makeStringProp = (defaultVal: string) => ({
  type: String,
  default: defaultVal,
})
export {
  makeArrayProp,
  makeNumberProp,
  makeNumericProp,
  makeRequiredProp,
  makeStringProp,
  numericProp,
  truthProp,
  unknownProp,
}
