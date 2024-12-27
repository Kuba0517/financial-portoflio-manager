import NextAuth, {Session, SessionStrategy} from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import {User as NextUser} from "next-auth";
import bcrypt from "bcrypt";
import {JWT} from "next-auth/jwt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "string", placeholder: "email" },
                password: {label: "Password", type: "string", placeholder: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                await connectToDatabase();

                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error('Invalid email or password');
                }

                const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid email or password');
                }

                return { id: user._id, name: user.name, email: user.email, role: user.role };
            },
        })
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    callbacks: {
        async jwt({token, user }: {token: JWT; user?: NextUser}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        },
        async session({ session, token }: {session: Session; token: JWT}) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };