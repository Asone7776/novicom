import React, { FC } from 'react';
import VskLogo from '../img/vsk-logo.svg';
import Quit from '../img/exit.svg';
import NavBtn from './NavBtn';
const SidebarFooter: FC = () => {
    return (
        <>
            <div className="divider"></div>
            <div className="sidebar-footer">
                <NavBtn onClick={() => { }} title='Выйти' icon={Quit} />
                <div className="vsk-logo">
                    <img src={VskLogo} alt="vsk-logo" />
                </div>
                <p>1992–2022 Страховое<br />акционерное общество «ВСК»</p>
            </div>
        </>
    );
}

export default SidebarFooter;