<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 20 + (i % 30),
  status: i % 3 === 0 ? 'enabled' : i % 3 === 1 ? 'disabled' : 'pending',
}))

const option: TableOption = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'status', label: 'Status' },
  ],
  filters: [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
        { label: 'Pending', value: 'pending' },
      ],
      multiple: true,
    },
    {
      key: 'users',
      label: 'Users',
      options: mockData.map(item => ({
        label: item.name,
        value: item.id,
      })),
      multiple: true,
      searchable: true,
    },
  ],
  api: {
    fetch: async ({ page, pageSize }, queryParams) => {
      await new Promise<void>(resolve => setTimeout(resolve, 500))

      let items = [...mockData]

      // filter by status
      if (queryParams.status && queryParams.status.length > 0) {
        const statuses = Array.isArray(queryParams.status)
          ? queryParams.status
          : [queryParams.status]
        items = items.filter(item => statuses.includes(item.status))
      }
      // filter by user
      if (queryParams.users && queryParams.users.length > 0) {
        const users = Array.isArray(queryParams.users)
          ? queryParams.users
          : [queryParams.users]
        items = items.filter(item => users.includes(item.id))
      }

      return {
        items: items.slice((page - 1) * pageSize, page * pageSize),
        itemCount: items.length,
      }
    },
  },
}
</script>
