import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  id: string;
  email: string;
  username: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please provide both email and password.");
        }
        
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email }
        });
      
        if (!existingUser) {
          throw new Error("Invalid credentials: Email does not exist.");
        }
        
        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          throw new Error("Invalid credentials: Incorrect password.");
        }

        // Successful authentication
        return {
          id: existingUser.id.toString(),
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        } as ExtendedUser;
        
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
   async session({ session, token }) {
  session.user = {
    ...session.user,
    id: token.id,
    email: token.email,
    username: token.username,
    role: token.role,
  } as ExtendedUser;
  return session;
}

  },
};
