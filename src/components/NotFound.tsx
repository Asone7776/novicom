import React, { FC } from 'react';
import LvbLogo from "./LvbLogo";
import { useNavigate } from "react-router-dom";
const NotFound: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="vertical-center">
            <div className="not-found-page">
                <LvbLogo linkTo={'/'} colored={true} />
                <h3>Такой страницы не существует</h3>
                <button className="btn btn-primary" onClick={() => {
                    navigate('/');
                }}>
                    На главную
                </button>
            </div>
        </div>
    );
}

export default NotFound;