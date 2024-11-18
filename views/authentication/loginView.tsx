"use client";

import { useState, useEffect } from "react";
import { useFormField, FormSchema, toastNotification } from "@/lib";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import PasswordField from "@/components/form/passwordField";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginView() {

  const { value: email, error: emailError, handleChange: handleEmailChange } = useFormField('', FormSchema.shape.email);
  const { value: password, error: passwordError, handleChange: handlePasswordChange } = useFormField('', FormSchema.shape.password);

  const [isDisabled, setIsDisabled] = useState(true)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();



  useEffect(() => {
    setIsDisabled(!email || !password)
  }, [email, password])


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const signInData = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInData?.error) {
        toastNotification("error", "top-right", undefined, {
          message: signInData.error || "Login Failed",
        });
        setLoading(false);
        return;
      }

      if (session?.user?.role) {
        if (session.user.role === 'ADMIN') {
          router.push('/dashboard');
        } else if (session.user.role === 'NORMAL_USER') {
          router.push('/frontend');
        }
        toastNotification("success", "top-right", undefined, {
          message: "Login Successful",
        });
      }
    } catch (error: any) {
      toastNotification("error", "top-right", undefined, {
        message: error.message || "Failed to Login",
      });
      console.error("Login failed", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          htmlFor="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          isInvalid={!!emailError}
          errorMessage={emailError}
          onChange={(value) => handleEmailChange(value)}
          endContent={<FaRegEnvelope className="w-4 h-4"

          />}
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
        <div className="flex justify-between text-pricesageBlack">
          {/* <Link href="/auth/login">Forget Password?</Link> */}
          <Link href="/auth/signup">
            Don't have an account?
            <span className="text-pricesageOrange font-semibold pl-2">
              Sign up
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" disabled={isDisabled || success} className="mt-4 p-6 w-1/2 text-white bg-[#010101]">
            {loading ? (
              <>
                <img src="/images/spinner-small.svg" alt="loading" className="mx-auto" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
