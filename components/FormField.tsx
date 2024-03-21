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
        <div className='input-div'>
            <label>{label}:</label>
            <input type={type} placeholder={placeholder}
                   className='form-input-field' {...register(name, {valueAsNumber})}/>
            {error && <span className="error-message">{error.message}</span>}
        </div>
    </>
);
export default FormField;