import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./schemas";
import { nextAuthEdgeConfig } from "./auth-edge";

const config: NextAuthConfig = {
  ...nextAuthEdgeConfig,
  providers: [
    Credentials({
      // runs on every login attempt
      async authorize(credentials) {
        // validate form data
        const validationResult = authSchema.safeParse(credentials);

        if (!validationResult.success) {
          return null;
        }

        const { email, password } = validationResult.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        return user;
      },
    }),
  ],
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
