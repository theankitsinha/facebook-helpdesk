import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import {comparePassword} from "@/lib/bcrypt";

export const nextAuthOptions = {
    pages: {
        signIn: '/login',
        newUser: "/register",
        error: '/login',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                },
                password: {
                    label: "password:",
                    type: "password",
                },
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password || credentials.password.toString().trim() == '' || credentials.email.toString().trim() == '') {
                    throw new Error(JSON.stringify({
                        errors: 'Credentials are not filled',
                        status: false
                    }));
                }
                const response = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                if (!response) {
                    throw new Error(JSON.stringify({
                        errors: 'User not found.',
                        status: false
                    }));
                }
                const password = await comparePassword(credentials.password, response.password);
                if (!password) {
                    throw new Error(JSON.stringify({
                        errors: 'Invalid credentials',
                        status: false
                    }));
                }
                return {
                    name: response.name,
                    id: String(response.id),
                    email: response.email,
                    createdAt: response.createdAt,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({token, user,}: { token: any, user: any }) {
            if (user) {
                token.user = user
                token.id = user.id
            }
            return token;
        },
        async session({session, token}: { session: any, token: any }) {
            session.user = token.user
            session.id = token.id
            return session
        },
    },
};