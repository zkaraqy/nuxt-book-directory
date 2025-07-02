import { z } from "zod";
import { useValidatedBody } from "~~/server/utils/use-validated-body";
import { User } from "~~/server/models";
import { genSaltSync, hashSync } from "bcrypt";

const schemaValidation = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(5, { message: "Name length at least 5 character" }),
    username: z
      .string({ message: "Username is required" })
      .min(5, { message: "Username length at least 5 character" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email is invalid" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password length at least 8 character" })
      .max(255, { message: "Your password is too long" }),
    confirmPassword: z
      .string({ message: "Confirmation password is required" })
      .min(8, { message: "Confirmation password length at least 8 character" })
      .max(255, { message: "Your Confirmation password is too long" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password must be match!",
    path: ["confirmPassword"],
  });

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, schemaValidation);
  data.password = hashSync(data.password, genSaltSync(10));

  const result = await User.create(data);

  return result;
});
