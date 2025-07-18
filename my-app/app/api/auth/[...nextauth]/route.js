import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // ✅ REQUIRED
  debug: true,                          // ✅ Helps debugging on Vercel
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider === "github") {
        await connectDb();
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser?.username ?? session.user.name;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
