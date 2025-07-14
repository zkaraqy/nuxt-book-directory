<script setup lang="ts">
import { Search } from 'lucide-vue-next'

defineProps<{
  handleOnClick: Function
}>()

const modelSearch = ref("")

</script>

<template>
  <div class="flex flex-col w-full max-w-xl gap-4 mt-8">
    <h1 class="text-center text-2xl font-mono">Search a book!</h1>
    <div class="flex flex-row w-full max-w-xl items-center gap-1.5">
      <div class="w-full max-w-xl items-center">
        <Input @keyup.enter="handleOnClick(modelSearch)" id="search" type="text" placeholder="Search..." v-model="modelSearch" class="h-14 text-lg" />
      </div>
      <Button type="title" class="h-14 w-14" @click="handleOnClick(modelSearch)">
        <Search strokeWidth="3" class="text-white" />
      </Button>
    </div>
  </div>
</template>