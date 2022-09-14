import { useState } from 'react'; 
import axios from 'axios'; // HTTP 비동기 통신 라이브러리
import {
    Link
  } from 'react-router-dom';
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
        setEmail('');
        setPwd('');
    }
    // 로그인 버튼 클릭 이벤트
    const onSignInClick = async(e) => {
        const response = await axios.post('http://localhost:5000/login-action', { email, pwd });
        onReset(e);
        // 서버로부터 받아오는 데이터는 data로 받아온다.
        console.log(response.data);
        if(response.data === 'success'){
            alert('로그인 성공');
        }else if(response.data === 'failure'){
            e.preventDefault(); //submit 막기
            alert('로그인 실패');
        }else if(response.data === 'error'){
            e.preventDefault(); //submit 막기
            alert('서버 오류');
        }
    }
    return (
    <div className="container">
        <div className="login_container">
            <section className="login_section">
                <form className='login_form'>
                    <h1>로그인</h1>
                    <div className='email'>
                        <label htmlFor='userEmail'>EMAIL</label>
                        <input
                            id="userEmail"
                            type="email"
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
                        onClick={onSignInClick}>LOGIN
                    </button>
                    <div className='help_container'>
                        <button className='email_search'>이메일 찾기</button>
                        <button className='password_search'>비밀번호 찾기</button>
                    </div>
                </form>
            </section>
        </div>
        <div className="bg_container">
            <section className='bg_section'>
                <div className='register_container'>
                    <div className='register_text_container'>
                        <div>
                            <p>Would you like to join?</p>
                            <Link to="/register">
                                <button className='register_btn'>SIGN UP</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    );
}

export default Login;
