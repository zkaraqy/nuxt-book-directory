<template>
  <div class="container h-full rounded flex flex-col">
    <div class="flex mt-4 justify-between items-center">
      <h1 class="text-2xl font-mono">Statistic</h1>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" :class="cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )">
            <CalendarIcon class="mr-2 h-4 w-4" />
            <template v-if="value.start">
              <template v-if="value.end">
                {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                  df.format(value.end.toDate(getLocalTimeZone())) }}
              </template>

              <template v-else>
                {{ df.format(value.start.toDate(getLocalTimeZone())) }}
              </template>
            </template>
            <template v-else>
              Pick a date
            </template>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <RangeCalendar v-model="value" initial-focus :number-of-months="2"
            @update:start-value="(startDate) => value.start = startDate" />
        </PopoverContent>
      </Popover>
    </div>
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
          <p class="truncate" title="Book saved">{{ model?.totalBookSaved }} Books saved</p>
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
          <p class="truncate" title="Favorites">{{ model?.totalFavorites }} Favorites</p>
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
          <p class="truncate" title="Book in readlist">{{ model?.totalBookInReadlist }} Books in readlist</p>
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
          <p class="truncate" title="Waiting">{{ model?.totalBookWaiting }} Waiting</p>
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
          <p class="truncate" title="Currently reading">{{ model?.totalBookOnRead }} Currently reading</p>
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
          <p class="truncate" title="Paused ">{{ model?.totalBookPaused }} Paused</p>
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
          <p class="truncate" title="Finished books">{{ model?.totalBookFinished }} Finished books</p>
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
          <p class="truncate" title="Rereading books">{{ model?.totalBookOnRereading }} Rereading books</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DateRange } from 'radix-vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Book, BookOpen, BookOpenText, BookOpenCheck, BookHeart, BookMarked } from 'lucide-vue-next';

const userStore = useCurrentUserStore();
const { profile } = userStore;

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>

definePageMeta({
  layout: "user",
  middleware: "logged"
})

useHead({
  title: profile.name + " | Book Directory"
})

const model = ref<DashboardResponse>()

onMounted(() => {
  Promise.allSettled([
    $fetch('/api/dashboard', { params: { id: userStore.profile.id } })
  ])
    .then(([data]) => {
      if (data.status === "fulfilled") {
        model.value = data.value;
      }
    })
})

</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
</style>