import { useValidatedBody } from "~~/server/utils/use-validated-body";
import { SavedBook } from "~~/server/models";
import { z } from "zod";

const schemaValidation = z.object({
  id: z.number(),
  status: z.enum(["waiting", "reading", "paused", "finished", "rereading"]),
});

export default defineEventHandler(async (event): Promise<number[]> => {
  const data = await useValidatedBody(event, schemaValidation);
  const { id, type } = event.context.params!;
  return await SavedBook.update(
    { status: data.status },
    {
      where: { id: data.id, userId: parseInt(id), type },
    }
  );
});
