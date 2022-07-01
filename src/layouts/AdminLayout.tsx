import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
const AdminLayout: FC = () => {
    return (
        <div className='admin-layout'>
            <div className="container-fluid p-0 h-100">
                <div className="row no-gutters h-100">
                    <div className="col-2 fixed-sidebar">
                        <AdminSidebar />
                    </div>
                    <div className="col-10 offset-2">
                        <div className="content">
                            <div className="row d-flex justify-content-center no-gutters">
                                <div className="col-10">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AdminLayout;
