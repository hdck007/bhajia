import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
          params: {
              scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/",
          }
      }
    })
  ],
  callbacks: {
    async session({ session, token }:{
        session: any,
        token: any
    }) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        return session;
      },
    async jwt({ token, user, account }:{
        token: any,
        user: any,
        account: any
    }) {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
    },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }