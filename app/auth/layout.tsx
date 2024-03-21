import React from 'react';
import '@/app/auth/layout.css'

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="auth-screen container mt-5">
            <div className='auth-box'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
