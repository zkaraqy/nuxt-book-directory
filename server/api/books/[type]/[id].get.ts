import { useMyGoogleBooksAPIStore } from "~/stores/google-books-API";
import { SavedBook } from "~~/server/models";
import { useGridParam } from "~~/server/utils/params-handler";

const isEmpty = (obj: object) => Object.keys(obj).length === 0;

export default defineEventHandler(async (event): Promise<BooksResponse | undefined> => {
  const params = useGridParam(event);
  const userId = event.context.params?.id;
  const type = event.context.params?.type;

  const savedBooks = await SavedBook.findAll({
    where: isEmpty(params.where)
      ? { userId, type }
      : { ...params.where, userId, type },
    limit: params.limit,
    offset: params.offset,
    order: params.order,
    // logging: console.log
  });

  const googleAPIs = useMyGoogleBooksAPIStore();

  try {
    const fetchedBooks: Book[] = await Promise.all(
      savedBooks.map(async (book): Promise<Book> => {
        const bookFromGoogleAPI: { [key: string]: any } = await $fetch(
          googleAPIs.URLVolumes +
            "/" +
            book.bookId +
            "?key=AIzaSyCG_l9L2D_PXDGnMlUAJTvKqDTVeOikaiI"
        );
        return {
          id: book.id,
          book_id: book.bookId,
          type: book.type,
          status: book.status,
          created_at: book.createdAt,
          updated_at: book.updatedAt,
          ...bookFromGoogleAPI.volumeInfo,
        };
      })
    );

    const total = await SavedBook.count({
      where: isEmpty(params.where)
        ? { userId, type }
        : { ...params.where, userId, type },
    });

    return {
      rows: fetchedBooks,
      metadata: {
        total,
      },
    };
  } catch (error: any) {
    if (error.statusCode === 429) {
      throw createError({
        statusCode: 429,
        message: "Request API Google Books telah mencapai limit",
      });
    }
  }
});
