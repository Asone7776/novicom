import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const SignInLayout: FC = () => {
    return (
        <div className={'sign-in-layout'}>
            <Outlet />
        </div>
    )
};
export default SignInLayout;
