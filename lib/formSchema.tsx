import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(4, {
    message: "Please enter your full name",
  }),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
export default FormSchema

