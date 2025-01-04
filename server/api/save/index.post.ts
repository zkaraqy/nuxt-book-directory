import { SavedBook } from "~~/server/models";
import { useValidatedBody } from "~~/server/utils/use-validated-body";
import { z } from "zod";

const schemaValidation = z.object({
  bookId: z.string(),
  type: z.enum(["Favorites", "Readlist"]),
  status: z.enum(["waiting", "reading", "paused", "finished", "rereading"]),
  user_id: z.number(),
});

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, schemaValidation);
  return await SavedBook.create(data);
});
