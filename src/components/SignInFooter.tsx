import VskLogo from '../img/vsk-logo.png';
const SignInFooter = () => {
    return (
        <div className="sign-in-footer">
            <div className="col-6 cm-col">
                <p>1992–{new Date().getFullYear()} Страховое акционерное общество «ВСК»<br />Россия, Москва, 121552, ул. Островная, 4</p>
            </div>
            <div className="col-6 cm-col">
                <div className='vsk-logo' style={{backgroundImage:`url(${VskLogo})`}}></div>
            </div>
        </div>
    );
}

export default SignInFooter;    