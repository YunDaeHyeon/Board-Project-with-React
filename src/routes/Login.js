import { useRef, useState } from 'react'; 
import axios from 'axios'; // HTTP 비동기 통신 라이브러리
import {
    Link,
    useNavigate
  } from 'react-router-dom';
import './Login_style.css'
import { useAuth } from '../authentication/auth';

function Login() {
    const { login } = useAuth(); // 권환 제어 커스텀 훅 호출
    const navigate = useNavigate(); // 사용자 위치 파악
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    // input 태그 포커싱을 위한 DOM 접근 훅 호출
    const idInput = useRef();
    const onIdChage = (e) => {
        setId(e.target.value);
    }
    const onPwdChage = (e) => {
        setPwd(e.target.value);
    }

    const onReset = (e) => {
        setId('');
        setPwd('');
    }

    // 로그인 버튼 클릭 이벤트
    const onSignInClick = async(e) => {
        e.preventDefault();
        const response = await axios.post('http://192.168.35.47:5000/login-action', { id, pwd });
        if(response.data === 'failure'){
            alert('로그인 실패');
            idInput.current.focus(); // id input에 포커스 지정
            onReset(e);
        }else if(response.data === 'error'){
            alert('서버 오류');
            onReset(e);
        }else if(Object.keys(response.data).length !== 0){
            alert('로그인 성공');
            login(response.data); // object 형태로 전송
            onReset(e);
            // 로그인 성공 시 메인 페이지 이동
            navigate(`/board`);
        }
    };
    return (
    <div className="container">
        <div className="login_container">
            <section className="login_section">
                <form className='login_form'>
                    <h1>로그인</h1>
                    <div className='id'>
                        <label htmlFor='userId'>ID</label>
                        <input
                            id="userID"
                            type="text"
                            onChange={onIdChage}
                            value={id}
                            ref={idInput} // 로그인 실패 시 포커싱 지정
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
                        <button className='id_search'>아이디 찾기</button>
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
