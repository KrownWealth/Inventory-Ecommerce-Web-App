import { z } from "zod";

export const formSchema = (
  validationFn: (value: string) => boolean,
  errorMessage: string
) => {
  return z.string().refine(validationFn, { message: errorMessage });
};

export const EmailSchema = z
  .string()
  .email("Please enter a valid email address");

 export const PasswordSchema = formSchema(
  (value) => value.length >= 4,
  "Password must be at least 6 characters long"
);

export const UsernameSchema = z.string().min(4, {
    message: "Please enter your full name",
  });
 
