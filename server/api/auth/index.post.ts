import { z } from "zod";
import { User } from "~~/server/models";
import {
  comparePassword,
  encodeAccessToken,
  encodeRefreshToken,
} from "~~/server/utils/authentication";
import { useValidatedBody } from "~~/server/utils/use-validated-body";

const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, authSchema);
  const user = await User.findOne({
    where: { username: data.username },
  });

  if (
    user &&
    (await comparePassword(data.password, user?.dataValues.password!))
  ) {
    const accessToken = encodeAccessToken(user, event);
    const refreshToken = encodeRefreshToken(user.dataValues.id!.toString());
    return {
      accessToken,
      refreshToken,
    };
  }

  throw createError({
    statusCode: 422,
    message: "Invalid username or password",
  });
});
