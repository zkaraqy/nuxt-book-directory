<template>
  <div class="container">
    <h1 class="text-2xl font-mono">Your Readlist</h1>
    <DataGrid :use-filter-search="true" ref="grid" :headers="headers" :fetch="fetch" show-index>
      <template #item-imageLinks.thumbnail="item">
        <NuxtImg :src="item.imageLinks.thumbnail"/>
      </template>
      <template #item-updated_at="item">
        <div class="max-w-32 truncate" :title="formatTanggal(item.updated_at)">
          {{ formatTanggal(item.updated_at) }}
        </div>
      </template>
      <template #item-id="item">
        <div class="flex flex-row gap-1">
          <Button class="aspect-square p-0" variant="ghost" style="background-color: #d4ed6f;"><Pencil :size="20" class="aspect-square p-0" color="#586e00" /></Button>
          <Button class="aspect-square p-0" variant="ghost" style="background-color: #58d68c;"><Search :size="20" class="aspect-square p-0" color="#fff" /></Button>
          <Button class="aspect-square p-0" variant="destructive" ><Trash :size="20" class="aspect-square p-0" color="#fff" /></Button>
        </div>
      </template>
    </DataGrid>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user",
  middleware: "logged"
})

import { Pencil, Search, Trash } from 'lucide-vue-next';

const { profile } = useCurrentUserStore()

const fetch = {
  request: "/api/books/Readlist/" + profile.id,
  opts: {},
};
</script>

<style></style>