import { Hooks } from "crossws";

import type {
  EventHandler,
  EventHandlerResolver,
  EventHandlerResponse,
  EventHandlerRequest,
  H3Event,
  H3EventContext,
} from "h3";
import { Sequelize } from "sequelize";
import { ZodIssue } from "zod";
import {
  verifyToken,
  type AccessTokenPayload,
} from "~~/server/utils/authentication";
import { User } from "../models";
import _ from "lodash";

interface MyH3EventContext extends H3EventContext {
  decodedToken?: AccessTokenPayload;
  sequelize: Sequelize;
}

interface MyH3Event<T> extends H3Event {
  context: MyH3EventContext;
}
interface MyEventHandler<
  Request extends EventHandlerRequest = EventHandlerRequest,
  Response extends EventHandlerResponse = EventHandlerResponse
> {
  __is_handler__?: true;
  __resolve__?: EventHandlerResolver;
  __websocket__?: Partial<Hooks>;
  (event: MyH3Event<Request>): Response;
}

const extractToken = async (
  event: H3Event<EventHandlerRequest>
): Promise<AccessTokenPayload | undefined> => {
  const tokenCookies = getCookie(event, "accessToken");
  if (tokenCookies) {
    try {
      const decodedToken = await verifyToken(tokenCookies, "access");
      return decodedToken as AccessTokenPayload;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};

export const defineMyEventHandler = <T extends EventHandlerRequest, D>(
  handler: MyEventHandler<T, D>,
  moduleCodes?: undefined | string | string[]
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    let decodedToken;
    try {
      decodedToken = await extractToken(event);
      event.context.decodedToken = decodedToken;
      if (moduleCodes && !decodedToken) {
        throw {
          statusCode: 401,
          message: "Anda tidak terotentifikasi",
        };
      } else if (moduleCodes && moduleCodes !== "*") {
        const userModules = (await User.activeModules(decodedToken!.id)).map(
          (item) => item.code
        );
        moduleCodes =
          typeof moduleCodes === "string" ? [moduleCodes] : moduleCodes;
        if (_.intersection(userModules, moduleCodes).length == 0) {
          throw {
            statusCode: 403,
            message: "Anda tidak memiliki akses ke fitur ini",
          };
        }
      }
      return await handler(event as MyH3Event<T>);
    } catch (err: any) {
      setResponseStatus(event, err.statusCode ?? 500);
      if (err.statusCode === 422) {
        err.data = err.data?.reduce((validation: any, row: ZodIssue) => {
          const key = row.path.at(0) as string;
          return { ...validation, ...{ [key]: row.message } };
        }, {});
      } else if (err.message.includes("violates foreign key constraint")) {
        return {
          statusCode: 400,
          message: "The item cannot be removed because it's linked to other data",
        };
      } else {
        console.error(err);
      }
      return {
        code: err.code ?? err.statusCode,
        message: err.statusMessage ?? err.message,
        details: err.data,
      };
    }
  });
