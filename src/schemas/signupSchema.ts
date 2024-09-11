import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "User name must be at least 3 characters")
  .max(20, "User name must not more than 20 characters")
  .regex(
    /^[a-zA-Z0-9_.-]{3,16}$/,
    "User name must not contain special characters"
  );

export const signupSchema = z.object({
  userName: userNameValidation,
  email: z.string().email({ message: "email is not valid" }),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 character" }),
});
