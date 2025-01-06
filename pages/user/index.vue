<template>
  <div class="container h-full rounded flex flex-col">
    <h1 class="text-2xl mt-4 font-mono">Statistic</h1>
    <div class="flex gap-4">
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Book :size="30" color="#4626f9" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books you have saved from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Book saved">0 Books saved</p>
        </div>
      </div>
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookHeart :size="30" color="#E04540" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total favorites books from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Favorites">0 Favorites</p>
        </div>
      </div>
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookMarked :size="30" color="#A4CF74" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books in readlist from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Book in readlist">0 Books in readlist</p>
        </div>
      </div>
    </div>

    <h1 class="text-2xl mt-8 font-mono">Reading Progress</h1>
    <div class="flex gap-4">
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpen :size="30" color="#64B5F6" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books waiting to be read from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Waiting">0 Waiting</p>
        </div>
      </div>
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpenText :size="30" color="#FBC02D" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books currently reading from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Currently reading">0 Currently reading</p>
        </div>
      </div>
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpen :size="30" color="#90A4AE" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books paused from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Paused ">0 Paused</p>
        </div>
      </div>
    </div>

    <h1 class="text-2xl mt-8 font-mono">Completed and Rereading</h1>
    <div class="flex gap-4">
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpenCheck :size="30" color="#8D6E63" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books you have finished from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Finished books">0 Finished books</p>
        </div>
      </div>
      <div class="mt-4 p-2 flex flex-row w-[14rem] h-[5rem] border rounded-md shadow-sm gap-2">
        <div class="flex flex-row justify-center items-center w-[30%] h-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookOpen :size="30" color="#83C484" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total books you re-reading from [DATE] until [DATE]</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div class="flex flex-col truncate justify-center  text-lg w-[70%] h-full">
          <p class="truncate" title="Rereading books">0 Rereading books</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Book, BookOpen, BookOpenText, BookOpenCheck, BookHeart, BookMarked } from 'lucide-vue-next';

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