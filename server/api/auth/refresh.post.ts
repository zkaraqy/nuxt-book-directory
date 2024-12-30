import { z } from "zod";
import { User } from "~~/server/models";
import { encodeAccessToken, verifyToken } from "~~/server/utils/authentication";
import { useValidatedBody } from "~~/server/utils/use-validated-body";

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, z.object({ token: z.string() }));
  const decodedToken = await verifyToken(data.token, "refresh");
  const user = await User.scope("withoutPassword").findByPk(
    decodedToken.userId,
  );
  if (user) {
    const accessToken = encodeAccessToken(user.toJSON(), event);

    return {
      accessToken,
    };
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "No user binded with token",
    });
  }
});
