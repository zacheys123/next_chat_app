import { connectDb } from "@/lib/connectDb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      let firstname = user?.name?.split(" ")[0];
      let secondname = user?.name?.split(" ")[1];
      let email = user?.email;
      let token = account?.access_token;
      let expires = account?.expires_at;

      if (account?.provider === "google") {
        try {
          await connectDb();
          const exists = await User.findOne({ email });

          if (!exists) {
            const res = await fetch("http://localhost:3000/api/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname,
                secondname,
                email,
                token,
                expires,
              }),
            });
            if (res.ok) {
              const data = await res.json();
              console.log(data);

              return data;
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
