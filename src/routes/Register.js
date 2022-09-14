import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; // HTTP 비동기 통신 라이브러리
import './Register_style.css';

function Register() {
    return (
    <div className="container">
        <div className="bg_container">
            <section className='bg_section'>
                <div className='login_container'>
                    <div className='login_text_container'>
                        <div>
                            <p>Already a member?</p>
                            <Link to="/login">
                                <button className='login_btn'>LOGIN</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div className="register_container">
            <section className="register_section">
                <form className='register_form'>
                    <h1>회원가입</h1>
                    <div className='name'>
                        <label htmlFor='userName'>NAME</label>
                        <input
                            id="userName"
                            type="text"
                        />
                    </div>
                    <div className='email'>
                        <label htmlFor='userEmail'>EMAIL</label>
                        <input
                            id="userEmail"
                            type="text"
                        />
                    </div>
                    <div className='password'>
                        <label htmlFor='userPwd'>PASSWORD</label>
                        <input
                            id="userPwd"
                            type="password"
                        />
                    </div>
                    <div className='password_check'>
                        <label htmlFor='userPwdChk'>PASSWORD CHECK</label>
                        <input
                            id="userPwdChk"
                            type="password"
                        />
                    </div>
                    <button 
                        className='register_btn'>SIGN UP
                    </button>
                </form>
            </section>
        </div>
    </div>
    );
}

export default Register;
