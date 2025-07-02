import { H3Event, type EventHandlerRequest } from "h3";
import type { ZodTypeAny } from "zod";

interface BodyData {
  [key: string]: any;
  getFile: (name: string) => {
    filename: string;
    type: string;
    data: Buffer;
  };
  toJson: () => any;
}

export const useValidatedBody = async (
  event: H3Event<EventHandlerRequest>,
  zodSchema: ZodTypeAny | false
): Promise<any> => {
  const checkBody = await readBody(event);
  if (!checkBody) {
    throw createError({
      statusCode: 400,
      statusMessage: "Terdapat Kesalahan pada data yang dikirim",
    });
  }
  const contentType = event.headers.get("content-type")?.toLowerCase();
  let body: any;

  switch (true) {
    case contentType === "application/x-www-form-urlencoded":
      body = Object.fromEntries(await readFormData(event));
      break;
    case contentType === "application/json":
      body = await readBody(event);
      break;
    case contentType?.startsWith("multipart/form-data"):
      body = Object.fromEntries(await readFormData(event)) as any;
      Object.keys(body).forEach((key) => {
        if (typeof body[key] === "string") {
          const value = body[key];
          try {
            body[key] = JSON.parse(value);
          } catch {
            body[key] = value;
          }
        }
      });
      const multipartBody = await readMultipartFormData(event);
      const files = multipartBody?.reduce((result, current) => {
        if (current.type)
          return { ...result, ...{ [current?.name!]: current } };
        else return result;
      }, {});
      body._multipartBody = files;
      break;
    default:
      body = Object.fromEntries(await readFormData(event));
      break;
  }
  if (zodSchema !== false) {
    const result = await zodSchema.safeParseAsync(body);
    if (result.success) {
      if (body._multipartBody) {
        result.data._multipartBody = body._multipartBody;
        result.data.getFile = function (name: string): File {
          return this._multipartBody[name] ?? null;
        };
        result.data.hasFile = function (name: string): boolean {
          return Object.keys(this._multipartBody).includes(name);
        };
      }
      return result.data;
    } else {
      throw createError({
        statusCode: 422,
        statusMessage: "There are mistakes in the form",
        data: result.error.issues,
      });
    }
  }
  return body;
};
