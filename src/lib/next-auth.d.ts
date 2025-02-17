import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    hasAccess: boolean;
  }

  interface Session {
    user: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    email: string;
    hasAccess: boolean;
  }
}
