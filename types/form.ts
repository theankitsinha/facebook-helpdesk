import {z, ZodType} from "zod"; // Add new import
import {FieldError, UseFormRegister} from "react-hook-form";

export type LoginFormData = {
    email: string;
    password: string;
};
export type RegisterFormData = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
};
export type FormFieldProps = {
    label: string;
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<RegisterFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};
export type ValidFieldNames =
    | "email"
    | "name"
    | "password"
    | "confirmPassword";
export const LoginFormSchema: ZodType<LoginFormData> = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, {message: "Password is too short"})
            .max(20, {message: "Password is too long"}),
    });
export const RegisterFormSchema: ZodType<RegisterFormData> = z
    .object({
        email: z.string().email(),
        name: z.string().min(3, {message: "Name is too short"}),
        password: z
            .string()
            .min(8, {message: "Password is too short"})
            .max(20, {message: "Password is too long"}),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
    });