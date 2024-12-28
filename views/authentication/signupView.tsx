"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import { FormSchema, toastNotification, useFormField } from "@/lib";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import PasswordField from "@/components/form/passwordField";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { ThreeDotsLoader } from "@/components/custom-ui/reuseables";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"

export default function SignupView() {
  const router = useRouter();

  const { value: username, error: usernameError, handleChange: handleUsernameChange } = useFormField('', FormSchema.shape.username);
  const { value: email, error: emailError, handleChange: handleEmailChange } = useFormField('', FormSchema.shape.email);
  const { value: password, error: passwordError, handleChange: handlePasswordChange } = useFormField('', FormSchema.shape.password);

  const [isDisabled, setIsDisabled] = useState(true)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setIsDisabled(!email || !username || !password)
  }, [email, username, password])


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      toastNotification("success", "top-right", undefined, {
        message: "Successfully signup",
      });
      router.replace('/auth/sign-in')
      console.log("Signup successful", data);
    } catch (error) {
      console.error("User registeration fail", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Username"
          type="text"
          name="username"
          htmlFor="username"
          placeholder="Enter your username"
          value={username}
          isInvalid={!!usernameError}
          errorMessage={usernameError}
          onChange={handleUsernameChange}
          required
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          name="email"
          htmlFor="email"
          placeholder="Enter your email"
          value={email}
          isInvalid={!!emailError}
          errorMessage={emailError}
          onChange={handleEmailChange}
          endContent={<FaRegEnvelope className="w-4 h-4"
          // required 
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
          onChange={handlePasswordChange}
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
          <Link href="/auth/login">
            Already have an account?
            <span className="text-pricesageOrange font-semibold pl-2">
              Login
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" disabled={isDisabled || success} className="mt-4">
            {loading ? (
              <>
                <ThreeDotsLoader color="#ffffff" />

              </>
            ) : (
              <span>Signup</span>
            )}
          </Button>

        </div>
      </form>
    </div>
  );
}
