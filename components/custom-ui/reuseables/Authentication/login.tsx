"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, } from "@/types/form";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import { toast } from "@/lib";
import { useState } from "react";
import { FormSchema } from "@/lib";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FaRegEnvelope, FaRegEye  } from "react-icons/fa";


export function Login() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = (data: FormSchemaType) => {
    // Simulate authentication request
    try {
      // Add your authentication logic here
      console.log("Form submitted successfully:", data);
      toast.success("Authenticated successfully!");
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
          required={true}
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          startcnt={<FaRegEnvelope  className="w-4 h-4"/>}

        />
        <FormField
          label="Password"
          type="password"
          id="password"
          htmlFor="password"
          placeholder="Enter your password"
          isRequired="*"
          required
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          startcnt={<FaRegEye className="w-4 h-4"/>}
        />
        <div className="flex justify-between text-pricesageBlack">
          <div className="flex items-center space-x-2">
             <Link href="/auth/forgot-password"> Forgot password?</Link>
          </div>
          <Link href="/auth/signup"> Don't have an account?
            <span className="text-pricesageOrange font-semibold pl-2">Signup</span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]" >Submit</Button>
        </div>
      </form>
    </div>
  );
}
