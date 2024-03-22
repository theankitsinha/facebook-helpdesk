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
            <div className="container h-screen">
                <div className="flex mx-auto min-h-full flex-col justify-center items-center py-12">
                    <div className="bg-white w-[33%] px-12 py-10 rounded-3xl">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">Create
                                Account</h2>
                        </div>

                        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                            <RegisterForm/>
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href="/login"
                                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
