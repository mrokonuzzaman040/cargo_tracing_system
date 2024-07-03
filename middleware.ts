import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/public/auth/signin",
  },
});

export const config = { matcher: ["/private/:path*"] };
