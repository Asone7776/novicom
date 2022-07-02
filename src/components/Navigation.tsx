import React, { FC } from 'react';
import Profile from '../img/profile.svg';
import History from '../img/history.svg';
import NavItem from './NavItem';

export interface NavItemProps {
    link: string,
    icon: string,
    title: string
}

const navigationItems: NavItemProps[] = [
    {
        link: '/admin/new',
        icon: Profile,
        title: 'Новый полис'
    },
    {
        link: '/admin/history',
        icon: History,
        title: 'История'
    }
];

const Navigation: FC = () => {
    return (
        <div className="navigation">
            {navigationItems.map((item, index) => <NavItem key={`nav-${index}`} link={item.link} icon={item.icon} title={item.title} />)}
        </div>
    );
}

export default Navigation;