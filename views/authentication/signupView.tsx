"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/formField";
import { FormSchema, toastNotification, useFormField } from "@/lib";
import Link from "next/link";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import PasswordField from "@/components/form/passwordField";
import { useRouter } from "next/navigation";
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
      console.log("Error during signup", error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          endContent={<FaRegUser className="w-4 h-4" />}
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
          onChange={(value) => handlePasswordChange(value)}
        />

        <div className="flex justify-between text-pricesageBlack">
          {/* <Link href="/auth/login">Forget Password?</Link> */}
          <Link href="/auth/sign-in">
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
