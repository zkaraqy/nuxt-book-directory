interface Book {
  id: number;
  book_id: string;
  title?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  previewLink?: string;
  infoLink?: string;
  type: "Favorites" | "Readlist";
  status: "waiting" | "reading" | "paused" | "finished" | "rereading";
  created_at: Date;
  updated_at: Date;
}

interface BooksResponse {
  rows: Book[];
  metadata: {
    total: number;
  };
}

declare global {
  type Book = Book;
  type BooksResponse = BooksResponse;
}
