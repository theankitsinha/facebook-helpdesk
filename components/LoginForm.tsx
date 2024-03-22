'use client';
import React, {ChangeEvent, useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {LoginFormData, LoginFormSchema} from "@/types/form";
import Button from "@/components/ui/button";

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = LoginFormSchema.safeParse(formValues);
            if (!result.success) {
                const serverErrors = Object.fromEntries(
                    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
                );
            }


            setLoading(true);
            setFormValues({email: "", password: ""});
            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });
            if (res?.error) {
                const errorJson = JSON.parse(res!.error);
                setError(errorJson.errors);
            }
            setLoading(false);
            if (!res?.error) {
                router.push(callbackUrl);
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    return (
        <>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email"
                           className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" autoComplete="email"
                               placeholder="example@email.com" required
                               value={formValues.email} onChange={handleChange}
                               className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 outline-none shadow-sm placeholder:text-gray-400 focus-within:border-gray-400 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password"
                           className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" placeholder="password"
                               value={formValues.password} onChange={handleChange}
                               autoComplete="current-password" required
                               className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 outline-none shadow-sm placeholder:text-gray-400 focus-within:border-gray-400 sm:text-sm sm:leading-6"/>
                    </div>

                    <span className="block text-gray-500 font-bold mt-2">
                                <input className="mr-2 leading-tight" type="checkbox"/>
                                <span className="text-sm font-medium leading-6 text-gray-900">
                                    Remember Me
                                </span>
                            </span>
                </div>
                {error && <div className='text-red-600 font-light '> {error} </div>}
                <div>
                    <Button type="submit" disabled={loading}>{!loading ? "Login" : "Please wait..."}</Button>
                </div>
            </form>
        </>

    );
};
