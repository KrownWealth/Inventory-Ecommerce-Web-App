"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType } from "@/types/form";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import { toast } from "@/lib";
import { FormSchema } from "@/lib";
import Link from "next/link";
import { FaRegEnvelope, FaRegEye } from "react-icons/fa";

export function Login() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
    setValue,
    trigger, // Trigger validation manually
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // Validate on change
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const handleFormSubmit = async (data: FormSchemaType) => {
    try {
      // Create FormData object from form data
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Submit the form data to the server action
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      console.log("Successul Login", formData)
      // Handle successful login
      toast.success("Authenticated successfully!");
      window.location.href = '/account'; // Redirect to account page

    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField
          label="Email"
          type="email"
          id="email"
          htmlFor="email"
          placeholder="Enter your email"
          isRequired="*"
          required
          value={emailValue}
          onChange={(e) => {
            setValue("email", e.target.value);
            trigger("email");
          }}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          endContent={<FaRegEnvelope className="w-4 h-4" />}
        />
        <FormField
          label="Password"
          type="password"
          id="password"
          htmlFor="password"
          placeholder="Enter your password"
          isRequired="*"
          required
          value={passwordValue}
          onChange={(e) => {
            setValue("password", e.target.value);
            trigger("password");
          }}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          endContent={<FaRegEye className="w-4 h-4" />}
        />
        <div className="flex justify-between text-pricesageBlack">
          <div className="flex items-center space-x-2">
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </div>
          <Link href="/auth/signup">
            Don&apos;t have an account?
            <span className="text-pricesageOrange font-semibold pl-2">Signup</span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
