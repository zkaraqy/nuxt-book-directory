import { compare, genSaltSync, hashSync } from "bcrypt";
import { H3Event, type EventHandlerRequest } from "h3";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const hashPassword = (password: string) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const comparePassword = (password: string, hashPassword: string) =>
  compare(password, hashPassword).then((resp) => resp);

export interface AccessTokenPayload {
  jwtId: string;
  [key: string]: any;
}

const {
  jwtAccessSecret,
  jwtRefreshSecret,
  accessTokenLifeTime,
  public: publicConfig
}: any = useRuntimeConfig();

export const encodeAccessToken = (
  userPayload: any,
  event?: H3Event<EventHandlerRequest>
) => {
  const payload: AccessTokenPayload = {
    jwtId: uuidv4(),
    ...{
      id: userPayload.id,
      email: userPayload.email,
      username: userPayload.username,
      name: userPayload.name,
    },
  };
  const token = jwt.sign(payload, jwtAccessSecret as string, {
    expiresIn: accessTokenLifeTime,
  });
  if (event) {
    setCookie(event, "accessToken", token, {
      expires: new Date(Date.now() + publicConfig.cookieLifeTime * 1000),
    });
  } else if (!event) {
    throw createError({
      statusCode: 500,
      message: "Event handler required",
    });
  }
  return token;
};

export const encodeRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      jwtId: uuidv4(),
      userId: userId,
    },
    jwtRefreshSecret as string,
    { expiresIn: publicConfig.cookieLifeTime }
  );
};

export const verifyToken: AccessTokenPayload | any = async (
  token: string,
  type: "access" | "refresh"
): Promise<JwtPayload & { jwtId: string; [key: string]: any }> => {
  try {
    const decodeToken = jwt.verify(
      token,
      type === "access" ? jwtAccessSecret : jwtRefreshSecret
    ) as any;
    return decodeToken;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token tidak valid",
    });
  }
};
