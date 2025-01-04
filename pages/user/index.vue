<template>
  <div class="container border h-full rounded shadow flex flex-col">
    <h1 class="text-2xl mt-4 font-mono">Statistic</h1>
    <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
      <div class="p-2 flex flex-row justify-center items-center w-[30%] h-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Book :size="30" /></TooltipTrigger>
            <TooltipContent>
                <p>Total books you have saved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class="p-2 flex flex-col justify-center items-start text-lg w-[70%] h-full">
        0 Book saved
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Book } from 'lucide-vue-next';

const userStore = useCurrentUserStore();
const { profile } = userStore

definePageMeta({
  layout: "user",
  middleware: "logged"
})

useHead({
  title: profile.name + " | Book Directory"
})

</script>

<style></style>