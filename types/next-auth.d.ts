import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string; 
    image?: string | null;
    name?: string | null;
  }

  interface Session {
    user: User
  }

  interface JWT {
    role: string; 
  }
}
