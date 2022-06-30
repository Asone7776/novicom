import React, { FC } from 'react';

interface CurrentUserProps {
    title: string
    email: string
}

const CurrentUser: FC<CurrentUserProps> = ({ title, email }) => {
    return (
        <div className="current-user">
            <h5>{title}</h5>
            <div className="user-email">
                {email}
            </div>
            <div className="divider"></div>
        </div>

    );
}

export default CurrentUser;