"use client";

import { useState } from "react";
import { useFormField, FormSchema } from "@/lib";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import PasswordField from "@/components/form/passwordField";


export function ResetPasswordView() {
  const [loading, setLoading] = useState(false); 

  const { value: password, error: passwordError, handleChange: handlePasswordChange } = useFormField('', FormSchema.shape.password);


 const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
    if (passwordError) {
      console.log("Validation failed.");
      return;
    }
  setLoading(true);

  // try {
  //   const formData = new FormData();
  //   formData.append("password", password);
  //   await emailLogin(formData);
  // } catch (error) {
  //   console.error("Login failed", error);
  //   setLoading(false);
  // }

};
 
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-4">
         <PasswordField
          label="Password"
          htmlFor="password"
          id="password"
          placeholder="Enter your new password"
          isRequired
          value={password}
          isInvalid={!!passwordError}
          errorMessage={passwordError}
          onChange={(value) => handlePasswordChange(value)}
        />
      
        <div className="flex items-center justify-center w-full pt-8">
          <Button type="submit" className="w-[40%]" disabled={loading}>
            {loading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Password Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
