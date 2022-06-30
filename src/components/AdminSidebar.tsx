import React, { FC } from 'react';
import LvbLogo from './LvbLogo';
import CurrentUser from './CurrentUser';
import Navigation from './Navigation';
import SidebarFooter from './SidebarFooter';
const AdminSidebar: FC = () => {
    return (
        <div className="admin-sidebar">
            <div className="sidebar-top">
                <LvbLogo linkTo='/' colored={true} />
                <CurrentUser title={'Администратор'} email={'administrator@domen.ru'} />
                <Navigation />
            </div>
            <div className="sidebar-bottom">
                <SidebarFooter />
            </div>
        </div>
    );
}

export default AdminSidebar;