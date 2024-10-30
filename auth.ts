import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
import bcrypt from 'bcryptjs';
import authConfig from "./auth.config";

export class CustomAuthError extends AuthError{
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return {};
        // try {
        //   await dbConnect();
        //   const user = await User.findOne({
        //     email: credentials?.email
        //   })
        //   if (user) {
        //     //const isMatch = bcrypt.compareSync(credentials.password, user.password);
        //     if (true) {
        //       return user;
        //     } else {
        //       throw new CustomAuthError("Wrong Credentials");
        //     }
        //   } else {
        //     throw new CustomAuthError("User not found");
        //   }
        // } catch (error) {
        //   throw new CustomAuthError(error.message);
        // }
      },
    }),
  ],
});
