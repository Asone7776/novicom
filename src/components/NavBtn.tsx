import React, { FC } from 'react';

interface NavBtnProps {
    onClick: () => void
    icon: string
    title: string
}

const NavBtn: FC<NavBtnProps> = ({ onClick, icon, title }) => {
    return (
        <button
            className='nav-link without-opacity'
            onClick={onClick}
        >
            <div className="nav-item">
                <div className="icon">
                    <img src={icon} alt="nav-icon" />
                </div>
                <div className='title'>
                    {title}
                </div>
            </div>
        </button>
    );
}

export default NavBtn;