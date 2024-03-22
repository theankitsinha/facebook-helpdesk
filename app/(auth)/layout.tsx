import React from 'react'

const AuthLayout = ({
                        children
                    }: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex items-center justify-center max-h-screen bg-[#004e96]'>
            {children}
        </div>
    )
}

export default AuthLayout