import {Metadata} from 'next';
import React from 'react';
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
    title: 'Login',
};

const RegisterPage = () => {

    return (
        <>
            <h2>Create account</h2>
            <RegisterForm/>
            <div className='redirect-div'>
                Already have an account?
                <Link className='redirect-link' href='/auth/login'>Login</Link>
            </div>
        </>
    );
};

export default RegisterPage;
