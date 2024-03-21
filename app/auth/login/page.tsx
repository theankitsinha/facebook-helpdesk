import {Metadata} from 'next';
import React from 'react';
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
    title: 'Login',
};

const LoginPage = () => {
    return (
        <>
            <h2>Login to your account</h2>
            <LoginForm/>
            <div className='redirect-div'>
                New to MyApp?
                <Link className='redirect-link' href='/auth/register'>Sign up</Link>
            </div>
        </>
    );
};

export default LoginPage;
