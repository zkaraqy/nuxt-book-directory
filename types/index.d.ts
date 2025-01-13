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
  type: collectionType;
  status: statusType;
  created_at: Date;
  updated_at: Date;
}

interface BooksResponse {
  rows: Book[];
  metadata: {
    total: number;
  };
}

interface IndustryIdentifiers {
  type?: string;
  identifier?: string;
}

type statusType = "waiting" | "reading" | "paused" | "finished" | "rereading";
type collectionType = "Favorites" | "Readlist";

interface BookModel {
  id?: number;
  bookId?: string;
  type: collectionType;
  status: statusType;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  industryIdentifiers?: IndustryIdentifiers[];
  pageCount?: number;
  dimensions?: {
    height?: string;
    width?: string;
  };
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

declare global {
  type Book = Book;
  type BooksResponse = BooksResponse;
  type BookModel = BookModel;
  type statusType = statusType;
  type collectionType = collectionType;
}
