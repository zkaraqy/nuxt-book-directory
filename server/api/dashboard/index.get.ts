import { SavedBook } from '~~/server/models'

export default defineEventHandler(async (event): Promise<DashboardResponse> => {
  const { id } = useQuery(event);
  const paramUserId = { where: { userId: id } }

  const totalBookSaved = await SavedBook.count(paramUserId);
  const totalFavorites = await SavedBook.count({
    where: {
      ...paramUserId.where,
      type: "Favorites"
    }
  })
  const totalBookInReadlist = await SavedBook.count({
    where: {
      ...paramUserId.where,
      type: "Readlist"
    }
  })
  const totalBookWaiting = await SavedBook.count({
    where: {
      ...paramUserId.where,
      status: "waiting"
    }
  })
  const totalBookOnRead = await SavedBook.count({
    where: {
      ...paramUserId.where,
      status: "reading"
    }
  })
  const totalBookPaused = await SavedBook.count({
    where: {
      ...paramUserId.where,
      status: "paused"
    }
  })
  const totalBookFinished = await SavedBook.count({
    where: {
      ...paramUserId.where,
      status: "finished"
    }
  })
  const totalBookOnRereading = await SavedBook.count({
    where: {
      ...paramUserId.where,
      status: "rereading"
    }
  })

  const result: DashboardResponse = {
    totalBookSaved,
    totalFavorites,
    totalBookInReadlist,
    totalBookWaiting,
    totalBookOnRead,
    totalBookPaused,
    totalBookFinished,
    totalBookOnRereading,
  }
  return result;
})
