import { useState } from 'react'; 
import axios from 'axios'; // HTTP 비동기 통신 라이브러리
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
    const onSaveUserInfo = async(e) => {
        onReset(e); // Input State 초기화
        const response = await axios.post('http://172.30.1.27:5000/login-action', { email, pwd });
        console.log("서버 응답 : ", response.data); // 응답되는 데이터는 response의 data로 받아온다.
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
                        onClick={onSaveUserInfo}>LOGIN
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
