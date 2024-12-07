import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null
      token?: string
    }
  }

  interface User {
    email: string
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string
    token?: string
  }
}
