'use client';
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {RegisterFormData, RegisterFormSchema, ValidFieldNames} from "@/types/form";
import FormField from "@/components/FormField";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema),
    });
    const onSubmit = async (data: RegisterFormData) => {
        try {
            setLoading(true);
            let exists: any = await fetch("/api/core/check", {
                method: 'POST',
                body: JSON.stringify(data)
            });
            if (exists.ok) {
                const {isEmailPresent} = await exists.json();
                if (isEmailPresent) {
                    setError('email', {
                        type: "server",
                        message: "Email already exists, try log-in"
                    });
                    setLoading(false);
                    return;
                }
            }
            const response = await fetch("/api/core/register", {
                method: 'POST',
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                console.log(response);
            }
            const {success, errors, user}: { success: boolean, errors: any, user: any } = await response.json();
            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidFieldNames> = {
                email: "email",
                name: "name",
                password: "password",
                confirmPassword: "confirmPassword",
            };
            // Find the first field with an error in the response data
            const fieldWithError = Object.keys(fieldErrorMapping).find(
                (field) => errors[field]
            );
            // If a field with an error is found, update the form error state using setError
            if (fieldWithError) {
                setError(fieldErrorMapping[fieldWithError], {
                    type: "server",
                    message: errors[fieldWithError],
                });
            }
            if (success) {
                router.push('/login');
            }
        } catch (error) {
            alert("Submitting form failed!");
        }
    };
    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    label="Name"
                    type="text"
                    placeholder="Manoj Kumar"
                    name="name"
                    register={register}
                    error={errors.name}
                />
                <FormField
                    label="Email"
                    type="email"
                    placeholder="manoj@richpanel.com"
                    name="email"
                    register={register}
                    error={errors.email}
                />
                <FormField
                    label="Password"
                    type="password"
                    placeholder="***************"
                    name="password"
                    register={register}
                    error={errors.password}
                />
                <FormField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                />
                <div>
                    <Button type="submit" disabled={loading}>{!loading ? "Sign Up" : "Loading"}</Button>
                </div>
            </form>
        </>

    );
};
