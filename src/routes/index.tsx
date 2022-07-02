import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInLayout from '../layouts/SignInLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from "../containers/login";
import TodayOrders from "../containers/polices/todayOrders";
import PolicyPage from "../containers/polices";
import CreatePolicy from "../containers/polices/create";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";
import { useAppSelector } from "../redux/store";
const RoutesComponent = () => {
    // const user = useAppSelector((state) => state.currentUser.data);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<SignInLayout />}
                >
                    <Route path="/" element={<Login />} />
                </Route>
                <Route
                    element={<AdminLayout />}
                >
                    {/* <Route path="/admin" element={<ProtectedRoute user={user} />}> */}
                    <Route path="admin">
                        <Route index element={<Navigate to={'/admin/new'} replace />} />
                        <Route path="new" >
                            <Route index element={<TodayOrders />} />
                            <Route path="create" element={<CreatePolicy />} />
                        </Route>
                        <Route path="history" element={<PolicyPage />} />
                    </Route>
                </Route>
                <Route
                    path={'*'}
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default RoutesComponent;
