import React, { useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requiredPattern, emailPattern } from "../functions";
import { login } from '../redux/actions/userActions';
import Cookies from "js-cookie";
import cn from 'classnames';
import Spinner from "./Spinner";
import { useAppDispatch } from "../redux/store";
import { loginData } from "../types/user";
import { useAppSelector } from "../redux/store";
import { loginFormDataTypes } from "../types/login";

const SignInForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.currentUser);
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormDataTypes>({});
    useEffect(() => {
        if (currentUser.success || Cookies.get('token')) {
            navigate('/admin');
        }
    }, [currentUser.success]);
    const onSubmit = (data: loginData) => {
        dispatch(login(data));
    };
    return (
        <div className="sign-in-form">
            <h4>Войти в личный кабинет</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Ваш e-mail</label>
                    <input placeholder="e-mail" className="form-control email-form-control" {...register("email", {
                        required: requiredPattern, pattern: emailPattern
                    })} />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input placeholder="Введите пароль" className="form-control" type={'password'} {...register("password", {
                        required: requiredPattern
                    })} />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button disabled={currentUser.loading} type="submit" className={cn('btn btn-primary', { 'loading': true })}>
                    {currentUser.loading ? (
                        <Spinner />
                    ) : 'Войти'}
                </button>
            </form>
        </div>
    );
}

export default SignInForm;