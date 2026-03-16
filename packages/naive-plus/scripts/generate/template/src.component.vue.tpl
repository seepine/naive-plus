<template>
  <button :class="bemClass"><%= pascalCaseName %></button>
</template>

<script lang="ts" setup>
import { useCreate } from '../../_hooks/create'
import { <%= camelCaseName %>Props } from './props'

const { bemClass } = useCreate('<%= name %>')

defineOptions({
  name: '<%= name %>',
})

defineProps(<%= camelCaseName %>Props)
</script>
