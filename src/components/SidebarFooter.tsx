import React, { FC } from 'react';
import VskLogo from '../img/vsk-logo.svg';
import Quit from '../img/exit.svg';
import NavBtn from './NavBtn';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../redux/store';
import { resetUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const SidebarFooter: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const logout = () => {
        Cookies.remove('token');
        dispatch(resetUser());
        navigate('/');
    }
    return (
        <>
            <div className="divider"></div>
            <div className="sidebar-footer">
                <NavBtn onClick={logout} title='Выйти' icon={Quit} />
                <div className="vsk-logo">
                    <img src={VskLogo} alt="vsk-logo" />
                </div>
                <p>1992–2022 Страховое<br />акционерное общество «ВСК»</p>
            </div>
        </>
    );
}

export default SidebarFooter;