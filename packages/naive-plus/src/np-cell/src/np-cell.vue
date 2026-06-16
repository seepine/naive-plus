<template>
  <div
    :class="`${bemClass} ${bemClass}__${props.size} ${
      isHover ? `${bemClass}__hover` : ''
    }`"
    @click="handleClick"
  >
    <div :class="`${bemClass}__content`">
      <div v-if="props.type || props.icon" :class="`${bemClass}__control`">
        <NCheckbox
          v-if="props.type === 'checkbox'"
          :size="typeSize"
          :checked="props.checked"
        />
        <NRadio
          v-else-if="props.type === 'radio'"
          :size="typeSize"
          :checked="props.checked"
        />
        <NSwitch
          v-else-if="props.type === 'switch'"
          :size="typeSize"
          :value="props.checked"
        />

        <div v-if="props.icon" :class="`${bemClass}__icon`">
          <component :is="renderContent(props.icon)" />
        </div>
      </div>
      <div
        :class="`${bemClass}__wrapper ${
          props.bordered ? `${bemClass}__wrapper-border` : ''
        }`"
      >
        <div :class="`${bemClass}__left`">
          <div :class="`${bemClass}__label`">
            <span v-if="isString(props.label)">{{ props.label }}</span>
            <component :is="renderContent(props.label)" v-else />
          </div>
          <div v-if="props.description" :class="`${bemClass}__description`">
            <span v-if="isString(props.description)">
              {{ props.description }}
            </span>
            <component :is="renderContent(props.description)" v-else />
          </div>
        </div>
        <div :class="`${bemClass}__right`">
          <div v-if="props.value" :class="`${bemClass}__value`">
            <span v-if="isString(props.value)">{{ props.value }}</span>
            <component :is="renderContent(props.value)" v-else />
          </div>
          <NIcon v-if="props.arrow" :class="`${bemClass}__arrow`">
            <ArrowRightIcon />
          </NIcon>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer || props.footer" :class="`${bemClass}__footer`">
      <slot name="footer">
        <component :is="renderContent(props.footer)" v-if="props.footer" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCheckbox, NRadio, NSwitch, NIcon } from 'naive-ui'
import { useCreate } from '../../_hooks/create'
import { isFunction, isString } from '../../utils'
import { npCellProps } from './props'
import type { NpCellContent } from './props'
import ArrowRightIcon from './arrow-right.vue'
import { computed } from 'vue'

const { bemClass } = useCreate('np-cell')

const props = defineProps(npCellProps)

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const typeSize = computed(() => {
  if (props.size === 'large') {
    return 'medium'
  }
  return 'small'
})

const isHover = computed(() => props.hover ?? props.type !== undefined)

const renderContent = (content: NpCellContent) => {
  if (isFunction(content)) {
    return content()
  }
  return content
}

const handleClick = () => {
  if (props.type) {
    emit('update:checked', !props.checked)
  }
}
</script>
