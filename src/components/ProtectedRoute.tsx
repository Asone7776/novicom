import { FC, ReactElement } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { userObject } from '../types/user/index';

interface ProtectedRouteProps {
    user: userObject
    redirectPath?: string
    children: ReactElement | null
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
    user,
    redirectPath = '/',
    children
}) => {
    if (!Cookies.get('token')) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;