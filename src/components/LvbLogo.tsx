import React, { FC } from 'react';
import BankLogo from '../img/novicom-white.png';
import { Link } from 'react-router-dom';
interface LogoComponentProps {
    linkTo?: string
}
const LvbLogo: FC<LogoComponentProps> = ({ linkTo }) => {
    return (
        linkTo ? (
            <div className='lvb-logo'>
                <Link to={linkTo}>
                    <img src={BankLogo} alt="bank-logo" />
                </Link>
            </div>
        ) : (
            <div className='lvb-logo'>
                <img src={BankLogo} alt="bank-logo" />
            </div>
        )
    );
}

export default LvbLogo;