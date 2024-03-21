'use client';
import React, {ReactNode, Suspense} from 'react';

interface IProps {
    children?: ReactNode;
}

const DefaultLayout = ({children}: IProps) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
    );
};

export default DefaultLayout;
