import {DefaultSession} from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            createdAt: string;
        } & DefaultSession['user'];
    }
}