"use client";

import { useState } from "react";
import { useFormState, EmailSchema, PasswordSchema } from "@/lib";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import Link from "next/link";
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import { emailLogin } from "@/app/actions";
import PasswordField from "@/components/form/passwordField";


interface LoginViewProps {
  searchParams: {
    message?: string;
  };
}

export default function LoginView({ searchParams }: LoginViewProps) {
  const [loading, setLoading] = useState(false); 
  
  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
  } = useFormState("", EmailSchema);

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useFormState("", PasswordSchema);

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
    await emailLogin(formData);
  } catch (error) {
    console.error("Login failed", error);
    setLoading(false);
  }
};
 
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          htmlFor="email"
          id="email"
          placeholder="Enter your email"
          isRequired="*"
          value={email}
          isInvalid={!!emailError}
          errorMessage={emailError}
          onChange={(value) => handleEmailChange(value)}
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
          <Link href="/auth/login">Forget Password?</Link>
          <Link href="/auth/signup">
            Don't have an account?
            <span className="text-pricesageOrange font-semibold pl-2">
              Sign up
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]" disabled={loading}>
            {loading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
