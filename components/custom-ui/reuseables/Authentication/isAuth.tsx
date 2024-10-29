"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useSession;


    useEffect(() => {
      if (!auth) {
        return redirect("/auth/sign-in");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}