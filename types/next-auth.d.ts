import NextAuth from "next-auth";
import {UserType} from "@"

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string; 
    image?: string | null;
    name?: string | null;
    accessToken?: string;
  }

  interface Session {
    user: User;
    isNewUser?: boolean;
  }

  interface JWT {
    role: string; 
    accessToken?: string;
    isNewUser?: boolean;
  }
}
