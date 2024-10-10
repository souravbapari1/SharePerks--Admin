import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextApiResponse } from "next";
import { client } from "@/lib/request/actions";
import { AdminUser } from "@/interface/admin";

export const revalidate = 0;
const next_options = (req: Request, res: NextApiResponse) => ({
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: any, req) {
        const { username, password } = credentials;
        try {
          const admin: AdminUser = await client
            .post("/api/v1/auth/admin/login")
            .json({ email: username, password: password })
            .send();

          return {
            id: admin.user?._id,
            email: username,
            image: admin.user?.image,
            name: admin.user?.name,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
});

export { nextAuth as GET, nextAuth as POST };

const nextAuth = (req: any, res: NextApiResponse) => {
  return NextAuth(req, res, next_options(req, res));
};
