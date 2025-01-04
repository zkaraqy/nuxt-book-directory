import { defineStore } from 'pinia'

export const useMyGoogleBooksAPIStore = defineStore("useMyGoogleBooksAPIStore", () => {
  // const URLVolumes = 'https://openlibrary.org/search.json';
  const URLVolumes = 'https://www.googleapis.com/books/v1/volumes';

  return {
    URLVolumes
  }
})