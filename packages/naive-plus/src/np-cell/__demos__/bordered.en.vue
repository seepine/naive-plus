<script setup lang="tsx">
import { NpCell } from '../index'

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div>
    <np-cell type="checkbox" label="Profile" :icon="iconRender" arrow bordered>
      <template #footer>
        <span style="font-size: 12px; color: #8a8a8a">
          Basic info and avatar
        </span>
      </template>
    </np-cell>
    <np-cell type="checkbox" label="Account Settings" arrow bordered />
    <np-cell type="checkbox" label="Privacy" arrow />
  </div>
</template>
