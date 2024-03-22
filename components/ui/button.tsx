import { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
    isLoading?: boolean
}

const Button: FC<ButtonProps> = ({ isLoading, children, ...props }) => {
    return <button type="button" disabled={isLoading} className="mt-3 flex w-full justify-center rounded-md bg-[#004e96] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#245481]" {...props}>{children}</button>
}

export default Button;