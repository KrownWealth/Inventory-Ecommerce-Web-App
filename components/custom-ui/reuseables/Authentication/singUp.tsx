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
import { FaRegEnvelope, FaRegEye, FaRegUser } from "react-icons/fa";


export function SignUp() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
    setValue,
    trigger, 
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", 
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  

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
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <Link href="/auth/login"> Already have an account?
            <span className="text-pricesageOrange font-semibold pl-2">Login</span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]" >Submit</Button>
        </div>
      </form>
    </div>
  );
}
