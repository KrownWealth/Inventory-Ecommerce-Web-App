"use client";

import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import { toastNotification, EmailSchema, PasswordSchema, useFormState } from "@/lib";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FaRegEnvelope, FaRegEye, FaSpinner } from "react-icons/fa";
import PasswordField from "@/components/form/passwordField";
import { signup } from "@/app/actions";
import { useState } from "react";


interface SignupViewProps {
  searchParams: {
    message?: string;
  };
}

export default function SignupView({ searchParams }: SignupViewProps) {
  const [loading, setLoading] =useState(false);
  const { value: email, error: emailError, handleChange: handleEmailChange } = useFormState('', EmailSchema);
  const { value: password, error: passwordError, handleChange: handlePasswordChange } = useFormState('', PasswordSchema);

 const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (emailError || passwordError) {
    console.log("Validation failed.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Trigger the emailLogin function, which handles redirection
    await signup(formData);

    // Show success toast notification
    toastNotification("success", "top-right", undefined, {
      message: "Signup successful!",
    });
  } catch (error) {
    console.error("Signup failed", error);
  } finally {
    setLoading(false);
  }
};

  return (


    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          id="email"
          htmlFor="email"
          placeholder="Enter your email"
          isRequired="*"
          value={email}
          isInvalid={!!emailError}
          errorMessage={emailError}
          onChange={handleEmailChange}
          endContent={<FaRegEnvelope className="w-4 h-4" />}
        />
        <PasswordField
          label="Password"
          htmlFor="password"
          id="password"
          placeholder="Enter your password"
          isRequired
          value={password}
          isInvalid={!!passwordError}
          errorMessage={passwordError}
          onChange={(value) => handlePasswordChange(value)}
        />
        {searchParams.message && (
          <div className="text-sm font-medium text-red-500">
           {searchParams.message}
          </div>
        )}
       
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
          <Link href="/auth/login">
            Already have an account?
            <span className="text-pricesageOrange font-semibold pl-2">
              Login
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]">
            {loading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>

  )

}
