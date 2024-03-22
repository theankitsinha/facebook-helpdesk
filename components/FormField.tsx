import React from "react";
import {FormFieldProps} from "@/types/form";

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 type,
                                                 placeholder,
                                                 name,
                                                 register,
                                                 error,
                                                 valueAsNumber,
                                             }) => (
    <>
        <div>
            <label
                className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-1">
                <input type={type} placeholder={placeholder} required
                       {...register(name, {valueAsNumber})}
                       className="block w-full rounded-md px-3 py-1.5 text-gray-900 border border-gray-300 outline-none shadow-sm placeholder:text-gray-400 focus-within:border-gray-400 sm:text-sm sm:leading-6"/>
            </div>
            {error && <div className='text-red-600 font-light '> {error.message}</div>}
        </div>
    </>
);
export default FormField;