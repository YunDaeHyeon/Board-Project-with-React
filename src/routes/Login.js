import { useState } from 'react'; 
import './Login_style.css'

function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const onEmailChage = (e) => {
        setEmail(e.target.value);
    }
    const onPwdChage = (e) => {
        setPwd(e.target.value);
    }
    const onReset = (e) => {
        e.preventDefault(); // submit 발생 시 reloading 막기
        console.log(email, pwd);
        setEmail('');
        setPwd('');
    }
    return (
    <div className="container">
        <div className="login_container">
            <section className="login_section">
                <form className='login_form'>
                    <div className='email'>
                        <label htmlFor='userEmail'>EMAIL</label>
                        <input
                            id="userEmail"
                            type="text"
                            onChange={onEmailChage}
                            value={email}
                        />
                    </div>
                    <div>
                        <label htmlFor='userPwd'>PASSWORD</label>
                        <input
                            id="userPwd"
                            type="password"
                            onChange={onPwdChage}
                            value={pwd}
                        />
                    </div>
                    <button 
                        className='login_btn'
                        onClick={onReset}>LOGIN
                    </button>
                </form>
            </section>
        </div>
        <div className="bg_container">
            <section className='bg_section'>
                <div className='register_container'>
                    <div className='register_text_container'>
                        <div>
                            <p>Would you like to join?</p>
                            <button className='register_btn'>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    );
}

export default Login;
