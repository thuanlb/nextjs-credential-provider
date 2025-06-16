import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import serverConfig from "@/config/server";
import webRoutes from "@/routes/web";
import signIn from "./signIn";

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) {
                        return null;
                    }

                    const { loginData, userData } = await signIn(credentials);

                    return {
                        id: userData.id,
                        jwt: loginData.jwt,
                        provider: userData.provider,
                        email: userData.email,
                        username: userData.username,
                        name: userData.name,
                        roleCode: userData.role?.code,
                        priority: userData.role?.priority,
                    };
                } catch (err) {
                    throw new Error("Thông tin đăng nhập không hợp lệ");
                }
            },
        }),
    ],
    secret: serverConfig.jwt.secret,
    session: {
        strategy: serverConfig.jwt.strategy,
    },

    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }

            return { ...token, ...user };
        },
        async session({ session, token }) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            session.user = token;

            return session;
        },
    },
};

export default authOptions;