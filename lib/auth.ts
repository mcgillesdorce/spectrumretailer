import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  interface JWT {
    role?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!username || !password) return null;

        try {
          const user = await prisma.user.findUnique({ where: { username } });
          console.log("[auth] findUnique result:", user ? `found (active=${user.active})` : "not found");
          if (!user || !user.active) return null;

          const valid = await bcrypt.compare(password, user.hashedPassword);
          console.log("[auth] password valid:", valid);
          if (!valid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.username,
            role: user.role,
          };
        } catch (err) {
          console.error("[auth] authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string; name: string; email: string; role: string }).role =
          (token.role as string | undefined) ?? "AGENT";
        (session.user as { id: string; name: string; email: string; role: string }).id =
          token.sub ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/agent/login",
  },
  session: { strategy: "jwt" },
});
