import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItemProps } from './Navigation';

const NavItem: FC<NavItemProps> = ({ link, icon, title }) => {
    return (
        <NavLink to={link}
            className={({ isActive }) =>
                (isActive ? "nav-link current" : "nav-link")}
        >
            <div className="nav-item">
                <div className="icon">
                    <img src={icon} alt="nav-icon" />
                </div>
                <div className='title'>
                    {title}
                </div>
            </div>
        </NavLink>
    );
}

export default NavItem;