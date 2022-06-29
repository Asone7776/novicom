import Worker from '../../img/factory-worker-min.jpg';
import LvbLogo from '../../components/LvbLogo';
import SignInForm from '../../components/SignInForm';
import SignInFooter from '../../components/SignInFooter';
const Login = () => {
    return (
        <div className="login-page">
            <div className="sign-bg" style={{ backgroundImage: `url(${Worker})` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="logo">
                                <LvbLogo />
                            </div>
                        </div>
                        <div className="col-4">
                            <SignInForm />
                        </div>
                    </div>
                </div>
            </div>
            <SignInFooter />
        </div>
    );
}

export default Login;