import React, { FC } from 'react';
import WhiteLogo from '../img/novicom-white.png';
import BlueLogo from '../img/novicom-blue.png';
import { Link } from 'react-router-dom';
interface LogoComponentProps {
    linkTo?: string,
    colored?: boolean
}
const LvbLogo: FC<LogoComponentProps> = ({ linkTo, colored = false }) => {
    return (
        linkTo ? (
            <div className='lvb-logo'>
                <Link to={linkTo}>
                    <img src={colored ? BlueLogo : WhiteLogo} alt="bank-logo" />
                </Link>
            </div>
        ) : (
            <div className='lvb-logo'>
                <img src={colored ? BlueLogo : WhiteLogo} alt="bank-logo" />
            </div>
        )
    );
}

export default LvbLogo;