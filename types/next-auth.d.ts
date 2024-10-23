import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string; 
  }

  interface Session {
    user: User
  }

  interface JWT {
    role: string; 
  }
}
