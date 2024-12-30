import { z } from "zod";
import { useValidatedBody } from "~~/server/utils/use-validated-body";
import { User } from "~~/server/models";
import { genSaltSync, hashSync } from "bcrypt";

const schemaValidation = z
  .object({
    name: z.string().min(3).max(100),
    username: z.string().min(3).max(100),
    email: z.string().min(8).max(100),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Konfirmasi password dan password harus sama!",
  });

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, schemaValidation);
  data.password = hashSync(data.password, genSaltSync(10));

  const result = await User.create(data);

  return result;
});
