<template>
  <div class="container">
    <div v-if="openModalEdit || openModalDetail" class="fixed inset-0 bg-opacity-50 z-40"
      style="background-color: rgba(0, 0, 0, 0.3);" @click="() => { openModalEdit = false }"></div>
    <Dialog v-model:open="openModalEdit">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>
            Change your current reading status
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="flex items-center gap-4">
            <div class="">
              <Label for="name" class="text-right">
                Status
              </Label>
            </div>
            <Select v-model="model.status">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Your current reading status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Reading Status</SelectLabel>
                  <SelectItem value="waiting">
                    Waiting
                  </SelectItem>
                  <SelectItem value="reading">
                    Reading
                  </SelectItem>
                  <SelectItem value="paused">
                    Paused
                  </SelectItem>
                  <SelectItem value="finished">
                    Finished
                  </SelectItem>
                  <SelectItem value="rereading">
                    Re-reading
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button @click="onSaveEdit" type="button">
            <Loader2 v-if="loadingModel.saveButton" class="animate-spin" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="openModalDetail">
      <DialogContent class="max-w-lg gap-0">
        <DialogHeader>
          <DialogTitle class="mb-2 flex items-center gap-2">Book Detail <Badge variant="default"
              :style="{ backgroundColor: getStatusColor(bookModel.status) }"
              class="flex items-center w-max justify-center text-sm">
              <p class="mb-0.5">{{ bookModel.status === "rereading" ? "Re-reading" : bookModel.status }}</p>
            </Badge>
          </DialogTitle>
          <div>
            <div class="flex space-x-4">
              <div>
                <NuxtImg :src="bookModel.imageLinks?.thumbnail" alt="Book Thumbnail"
                  class="rounded-lg shadow-lg w-24 h-auto" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-lg mb-1">{{ bookModel.title }}</p>
                <p class="text-sm opacity-70">By: {{ bookModel.authors?.join(", ") }}</p>
                <p class="text-sm opacity-70">Published: {{ bookModel.publishedDate }}</p>
                <p class="text-sm opacity-70">Publisher: {{ bookModel.publisher }}</p>
                <p class="text-sm opacity-70">Language: {{ bookModel.language }}</p>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div class="pb-4 pt-0 space-y-2">
          <Accordion type="single" class="w-full pt-0" collapsible>
            <AccordionItem v-for="i in 1" :key="0" :value="'0'" class="pt-0">
              <AccordionTrigger>ISBN</AccordionTrigger>
              <AccordionContent v-for="item in bookModel.industryIdentifiers" :key="item.identifier"
                :value="item.identifier">
                <p class="text-sm text-gray-700">
                  <span class="font-medium">{{ item.type }}:</span> {{ item.identifier }}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Page Count:</span> {{ bookModel.pageCount }} pages
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Average Rating:</span> {{ bookModel.averageRating }} ⭐ ({{ bookModel.ratingsCount
            }} ratings)
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Added on:</span> {{ formatTanggal(bookModel.createdAt!) }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Last updated:</span> {{ formatTanggal(bookModel.updatedAt!) }}
          </p>
        </div>
        <DialogFooter>
          <NuxtLink :to="bookModel.previewLink">
            <Button type="button">
              Preview
            </Button>
          </NuxtLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <h1 class="text-2xl font-mono">Readlist</h1>
    <DataGrid ref="grid" :use-filter-search="true" :headers="headers" :fetch="fetch" show-index sort-by="updated_at"
      sort-type="desc">
      <template #item-imageLinks.thumbnail="item">
        <NuxtImg :src="item.imageLinks.thumbnail" />
      </template>
      <template #item-updated_at="item">
        <div class="max-w-32 truncate" :title="formatTanggal(item.updated_at)">
          {{ formatTanggal(item.updated_at) }}
        </div>
      </template>
      <template #item-status="item">
        <Badge variant="default" :style="{ backgroundColor: getStatusColor(item.status) }"
          class="px-3 flex items-center w-max justify-center text-sm">
          <p class="mb-0.5">{{ item.status === "rereading" ? "Re-reading" : item.status }}</p>
        </Badge>
      </template>
      <template #item-id="item">
        <div class="flex flex-row gap-1">
          <Button @click="edit(item.id)" class="aspect-square p-0 on-hover-btn-edit">
            <Pencil :size="20" class="aspect-square p-0 " color="#586e00" />
          </Button>
          <Button @click="detail(item.id, item.book_id)" class="aspect-square p-0 on-hover-btn-detail">
            <Loader2 v-if="loadingModel.loadDetail && rowId === item.id" class="animate-spin" />
            <Search v-else :size="20" class="aspect-square p-0" color="#fff" />
          </Button>
          <Button @click="deleteBook(item.id)" class="aspect-square p-0 shadow-md" variant="destructive">
            <Loader2 v-if="loadingModel.deleteActionButton && rowId === item.id" class="animate-spin" />
            <Trash v-else :size="20" class="aspect-square p-0" color="#fff" />
          </Button>
        </div>
      </template>
    </DataGrid>

  </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
definePageMeta({
  layout: "user",
  middleware: "logged"
})

import { Pencil, Search, Trash, Loader2 } from 'lucide-vue-next';

const grid: Ref<any> = ref(null);
const { profile } = useCurrentUserStore();
const openModalEdit = ref(false);
const openModalDetail = ref(false);

const rowId = ref(0)
const model = ref<{
  id?: number
  status?: statusType
}>({})
const bookModel = ref<BookModel>({
  status: "waiting",
  type: "Readlist"
})
const loadingModel = ref<{
  saveButton: boolean;
  loadDetail: boolean;
  deleteActionButton: boolean;
}>({
  saveButton: false,
  loadDetail: false,
  deleteActionButton: false,
})

const mapStatusColor: Record<"waiting" | "reading" | "paused" | "finished" | "rereading", string> = {
  "waiting": "#B0B0B0",
  "reading": "#007BFF",
  "paused": "#FFC107",
  "finished": "#28A745",
  "rereading": "#FD7E14",
}

const getStatusColor = (status: keyof typeof mapStatusColor): string => {
  return mapStatusColor[status]
}

const edit = async (id: number) => {
  model.value.id = id
  openModalEdit.value = true;
}

const detail = async (id: number, bookId: string) => {
  rowId.value = id;
  loadingModel.value.loadDetail = true;
  bookModel.value = await $fetch(`/api/book/${id}?bookId=${bookId}`, { method: "GET" });
  openModalDetail.value = true
  loadingModel.value.loadDetail = false;
  rowId.value = 0;
}

const deleteBook = async (id: number) => {
  rowId.value = id;
  loadingModel.value.deleteActionButton = true;
  const resSwal = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });
  if (resSwal.isConfirmed) {
    $fetch(`/api/books/Readlist/${id}`, { method: "DELETE" })
      .then(async (res) => {
        if (res) {
          grid.value?.fetchData();
          await useToast("success", "Successfully deleting book from readlist", "Deleted!")
        }
      })
      .catch(async (err) => {
        await useToast("error", "Failed to delete book because " + err.message, "Fail")
      })
  }
  loadingModel.value.deleteActionButton = false;
  rowId.value = 0;
}

const fetch = {
  request: "/api/books/Readlist/" + profile.id,
  opts: {},
};

const onSaveEdit = () => {
  loadingModel.value.saveButton = true;
  $fetch(`/api/books/Readlist/${profile.id}`, { method: "PUT", body: model.value })
    .then(async (res) => {
      openModalEdit.value = false;
      model.value = {}
      grid.value?.fetchData();
      await useToast("success", "Berhasil mengupdate buku")
    }).catch(async (err) => {
      await useToast("error", "Gagal mengupdate buku")
    }).finally(() => {
      loadingModel.value.saveButton = false;
    })
}

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'question'
const mapIconColorToast = {
  'success': 'green',
  'error': 'red',
  'warning': 'orange',
  'info': 'lightblue',
  'question': 'gray'
}
const useToast = async (type: ToastType, message: string, title?: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: mapIconColorToast[type],
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  await Toast.fire({
    icon: type,
    title: title ? title : type.split('')[0].toUpperCase().concat(type.slice(1, type.length)),
    text: message
  })
}

</script>

<style scoped>
/* * {
  border: 1px dotted red;
} */

.on-hover-btn-edit {
  background-color: #d4ed6f;
}

.on-hover-btn-edit:hover {
  background-color: #c7ea3b;

}

.on-hover-btn-detail {
  background-color: #58d68c;
}

.on-hover-btn-detail:hover {
  background-color: #6ee29f;

}

.on-hover-btn-edit:hover,
.on-hover-btn-detail:hover {
  transition: all .3s;
}
</style>