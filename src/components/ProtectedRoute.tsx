import { FC, ReactElement } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    redirectPath?: string
    children?: ReactElement | null
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
    redirectPath = '/',
    children
}) => {
    if (!Cookies.get('token')) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;