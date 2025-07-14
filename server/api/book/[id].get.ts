import { useMyGoogleBooksAPIStore } from "~/stores/google-books-API";
import { SavedBook } from "~~/server/models";

export default defineEventHandler(
  async (event): Promise<BookModel | undefined> => {
    const query = useQuery(event);
    const { bookId } = query;
    const id = event.context.params?.id;
    const googleAPIs = useMyGoogleBooksAPIStore();

    try {
      const fetchedBook: { [key: string]: any } = await $fetch(
        googleAPIs.URLVolumes +
          "/" +
          bookId
      );

      const res = await SavedBook.findByPk(id);
      const book = res?.dataValues;

      return {
        ...book,
        ...fetchedBook.volumeInfo,
      };
    } catch (error: any) {
      throw error
      if (error.statusCode === 429) {
        throw createError({
          statusCode: 429,
          message: "Request API Google Books telah mencapai limit",
        });
      }
    }
  }
);
