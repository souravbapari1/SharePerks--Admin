import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL("/auth", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }: { token: any }) => {
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
