import { FC } from 'react';
import LvbLogo from './LvbLogo';
import CurrentUser from './CurrentUser';
import Navigation from './Navigation';
import SidebarFooter from './SidebarFooter';
import { useAppSelector } from '../redux/store';
const AdminSidebar: FC = () => {
    const user = useAppSelector((state) => state.currentUser.data);
    return (
        <div className="admin-sidebar">
            <div className="sidebar-top">
                <LvbLogo linkTo='/admin' colored={true} />
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