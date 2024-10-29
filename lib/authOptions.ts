import { NextAuthOptions, User, Session, TokenSet, } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { toastNotification } from "./toastContainer";


interface ExtendedUser extends User {
  email: string;
  username: string;
  password: string;
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
    //signUp: '/auth/signup',
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        });

        if (!existingUser) {
          throw new Error("Email doesn't exist! Please Signup"); 
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          return null;
        }

        // if user is found and password match 
        return {
          id: `existingUser.id`,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        } as ExtendedUser;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: TokenSet; user?: User }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token, trigger }: { session: Session; token: TokenSet; trigger: string}) {
    if (trigger === "update" && session.user) {
    token.email = session.user.email;
    token.username = session.user.username; 
    token.role = session.user.role;
  }
      if(!session.user) return session;
      else{
        session.user = token as any

        return session
      }
    },
  }
};
