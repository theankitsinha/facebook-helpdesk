import {withAuth} from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
        newUser: "/register"
    },
});
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|auth/register|assets|_next/static|_next/image|.*\\.png$).*)'],
};