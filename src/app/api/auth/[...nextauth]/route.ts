import NextAuth, { Session, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "string", placeholder: "email" },
                password: { label: "Password", type: "string", placeholder: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            console.log("JWT callback - Token:", token);
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("Session callback - Token:", token);
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            console.log("Session callback - Session:", session);
            return session;
        },
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
