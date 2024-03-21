'use client';
import React, {ChangeEvent, useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {LoginFormData, LoginFormSchema} from "@/types/form";

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
            <form className='auth-form' onSubmit={onSubmit}>
                <div className='input-div'>
                    <label>Email:</label>
                    <input required placeholder='example@email.com' className='form-input-field' name='email'
                           type="email" value={formValues.email} onChange={handleChange}/>
                </div>
                <div className='input-div'>
                    <label>Password:</label>
                    <input required placeholder='********' className='form-input-field' name='password' type="password"
                           value={formValues.password} onChange={handleChange}/>
                </div>
                <div>
                    <input type="checkbox" id="remembercheck" name="remembercheck" value="remembercheck"/>
                    <label htmlFor="remembercheck"> Remember me</label><br></br>
                </div>
                {error && <div className='error-message'> {error} </div>}
                <button className='auth-button' type="submit" disabled={loading}>
                    {!loading ? "Login" : "Loading"}
                </button>
            </form>
        </>

    );
};
