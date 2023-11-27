import { connectToDb } from "@utils/database";
import { Session } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import User from "@models/user"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID ?? "",
            clientSecret: process.env.GOOGLE_CLIENTSECRET ?? ""
        })
    ],
    callbacks: {
        async signIn({ profile }:any) {
            try {
                await connectToDb()
                const userExists = await User.findOne({
                    email: profile?.email
                })

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "")?.toLowerCase(),
                        image: profile?.picture
                    })
                }

                return true
            } catch (error) {
                console.log('async signIn', error)
                return false
            }
        },
        async session({ session }: any) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        }
    }
})

export { handler as GET, handler as POST }