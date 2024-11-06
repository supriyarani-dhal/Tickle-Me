import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
import { Session } from "inspector/promises";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      //credentials creates html document behind the scene for different authentication providers like github , email or linkedin etc
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "Enter email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();

        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { userName: credentials.identifier },
              { password: credentials.password },
            ],
          });

          //if this email is not listed in database
          if (!user) {
            throw new Error("No user found with this email");
          }
          //if the email is listed but not verified yet
          if (!user.isVerified) {
            throw new Error("Please verify your email before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          //after getting password, return the correct user control  to the NextAuth providers
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      //extract all the basic details of the session user from this token
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isMessageAccepting = token.isMessageAccepting;
        session.user.userName = token.userName;
      }

      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      //extract that details from the user
      if (user) {
        token._id = user._id.toString();
        token.isVerified = user.isVerified;
        token.isMessageAccepting = user.isMessageAccepting;
        token.userName = user.userName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
