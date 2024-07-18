import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./schemas";

const config: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
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
  callbacks: {
    // runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      console.log(
        isLoggedIn,
        isTryingToAccessApp,
        request.nextUrl.pathname,
        auth?.user.hasAccess
      );

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      // if the user is signing in attach user id to token
      if (user) {
        token.userId = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        const userDb = await prisma.user.findUnique({
          where: { email: token.email },
        });

        console.log(userDb);

        if (userDb) {
          token.hasAccess = userDb.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
