import type { Header } from "~/components/DataGrid/types";

export const headers: Header[] = [
  // { text: "Book ID", value: "book_id", searchable: true },
  { text: "Cover Image", value: "imageLinks.thumbnail", searchable: false },
  { text: "Title", value: "title", searchable: true },
  { text: "Date Modified", value: "updated_at", searchable: true, sortable: true },
  { text: "Status", value: "status", searchable: true, sortable: true },
  { text: "Action", value: "id", searchable: false },
]
