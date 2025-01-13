import { SavedBook } from "~~/server/models";

export default defineEventHandler(async (event): Promise<number> => {
  const { id, type } = event.context.params!;
  return await SavedBook.destroy({
    where: { id, type },
  });
});
