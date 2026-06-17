<template>
  <div
    :class="`${bemClass} ${bemClass}__${props.size} ${
      isHover ? `${bemClass}__hover` : ''
    }`"
    @click="handleClick"
  >
    <div
      :class="`${bemClass}__content ${
        props.bordered ? `${bemClass}__content-border` : ''
      }`"
    >
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
          <RenderContent :is="props.icon" />
        </div>
      </div>
      <div :class="`${bemClass}__wrapper`">
        <div :class="`${bemClass}__left`">
          <div :class="`${bemClass}__label`">
            <RenderContent :is="props.label" />
          </div>
          <div v-if="props.description" :class="`${bemClass}__description`">
            <RenderContent :is="props.description" />
          </div>
        </div>
        <div :class="`${bemClass}__right`">
          <div v-if="props.value" :class="`${bemClass}__value`">
            <RenderContent :is="props.value" />
          </div>
          <NIcon v-if="props.arrow" :class="`${bemClass}__arrow`">
            <ArrowRightIcon />
          </NIcon>
        </div>
      </div>
      <div v-if="$slots.footer || props.footer" :class="`${bemClass}__footer`">
        <slot name="footer">
          <RenderContent :is="props.footer" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCheckbox, NRadio, NSwitch, NIcon } from 'naive-ui'
import { useCreate } from '../../_hooks/create'
import { npCellProps } from './props'
import ArrowRightIcon from './arrow-right.vue'
import { computed } from 'vue'
import RenderContent from '../../_components/render-content/render-content'

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

const handleClick = () => {
  if (props.type) {
    emit('update:checked', !props.checked)
  }
}
</script>
