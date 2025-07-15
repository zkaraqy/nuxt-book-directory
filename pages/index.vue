<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-center items-center">
      <HomeSearchBook :handle-on-click="searchBook" />
    </div>
    <h1 class="text-center" v-if="statusResponse === 'error'" v-html="errorMessage"></h1>
    <div iv class="flex justify-start items-start">
      <div class="flex w-full flex-wrap gap-4 container justify-evenly items-start mt-4">
        <template v-for="(i, j) in 10">
          <div class="flex w-52 sm:w-96" v-if="statusResponse === 'pending'">
            <Skeleton class="w-[125px] h-[200px] rounded-xl" />
            <div class="flex flex-col space-y-3 justify-center items-center">
              <div class="flex flex-col justify-between p-3 space-y-3">
                <div>
                  <Skeleton class="h-4 w-[150px] rounded" />
                  <Skeleton class="h-4 w-[100px] rounded mt-2" />
                </div>
                <Skeleton class="h-4 w-full rounded" />
                <div class="mt-2">
                  <Skeleton class="h-8 w-[75px] rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="statusResponse === 'success'" v-for="(book, index) in data">
          <Card :id="index"
            class="flex flex-col h-full sm:flex-row w-52 sm:w-96 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            <div class="h-full flex col-span-2">
              <NuxtImg v-if="book?.volumeInfo?.imageLinks?.thumbnail"
                :src="book?.volumeInfo?.imageLinks?.thumbnail.replace('http://', 'https://')" alt="Book Thumbnail"
                class="w-auto h-[200px] object-cover" />
            </div>
            <div class="flex flex-col justify-between col-span-10">
              <CardHeader class="p-4">
                <CardTitle class="text-sm font-semibold text-gray-900">
                  {{ book?.volumeInfo?.title }}
                </CardTitle>
                <CardDescription class="text-xs text-gray-500 mt-1">
                  <p>{{ book?.volumeInfo?.publisher }} <span v-if="book?.volumeInfo?.publishedDate">| {{
                    book.volumeInfo.publishedDate }}</span></p>
                  <p class="mt-2 flex gap-1 justify-start items-center">
                    <Star :size="14" /> {{ book?.volumeInfo?.averageRating ?? 'No data' }} {{
                      book?.volumeInfo?.ratingsCount ? `(${book?.volumeInfo?.ratingsCount})` : '' }}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardFooter class="mt-2 p-4 flex gap-2">
                <a type="button" :href="book?.volumeInfo?.infoLink" target="_blank"
                  class="px-3 py-1.5 text-xs text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
                  See More
                </a>
                <Button @click="saveBook(book.id!, 'Favorites')" title="save to favorites" variant="destructive"
                  class="h-full px-1.5 py-1.5">
                  <Heart />
                </Button>
                <Button @click="saveBook(book.id!, 'Readlist')" title="save to readlist" variant="outline"
                  class="h-full px-1.5 py-1.5">
                  <Bookmark />
                </Button>
              </CardFooter>
            </div>
          </Card>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, Heart, Bookmark, Star } from 'lucide-vue-next';

useHead({
  title: "Book Directory"
})

import Swal from 'sweetalert2';
const statusResponse = ref("success")
const errorMessage = ref("")
const { URLVolumes } = useMyGoogleBooksAPIStore();
const { profile, isLogged } = useCurrentUserStore()
const dummy_data = dummyData();

// const data = dummy_data.items;
const data = ref<CardBook[]>([]);
// const data = dummy_data.items[0];
// const { volumeInfo } = data;

const searchBook = async (searchInput: string) => {
  try {
    statusResponse.value = 'pending'
    const url = URLVolumes + '?q=' + encodeURI(searchInput);
    const response: any = await $fetch(url);
    statusResponse.value = 'success'
    data.value = response.items
  } catch (err: any) {
    statusResponse.value = 'error'
    const error = err.data.error;
    console.log(error)
    if (error.code === 400) {
      errorMessage.value = "<span>"
      for (let i = 0; i < error.errors.length; i++) {
        errorMessage.value += error.errors[i].message + "<br>";
      }
      errorMessage.value += "</span>"
    } else {
      errorMessage.value = "There's an error ocurred 👎"
    }
  }
}

const saveBook = async (bookId: string, type: string) => {
  if (!isLogged()) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: 'You must login first'
    })
    return;
  }
  try {
    const response = await $fetch('/api/save', {
      method: "post",
      body: {
        bookId,
        type,
        status: 'waiting',
        user_id: profile.id
      }
    })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Successfully save book to ' + type
    })
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: 'Failed saving book to ' + type + ' because ' + (error.message ?? error.response.message ?? error.data.message)
    })
  }
}

// onMounted(async () => {
//   try {
//     statusResponse.value = 'pending'
//     const response:any = await $fetch(URLVolumes + '?q=harry+potter');
//     // const response = await $fetch('https://openlibrary.org/search.json?q=harry+potter');
//     statusResponse.value = 'success'
//     data.value = response.items
//     // console.log(response)
//   } catch (error) {
//     statusResponse.value = 'error'
//   }
// })
</script>

<style scoped>
* {
  /* border: 1px dotted red; */
}
</style>