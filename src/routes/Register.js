import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // HTTP 비동기 통신 라이브러리
import './Register_style.css';

function Register() {
    const [user, setUser] = useState({
        userName : '',
        userId : '',
        userPassword : '',
        userPasswordCheck : ''
    });
    // 버튼 클릭 시 input 태그 포커싱을 위해 DOM에 접근할 수 있는 useRef 가져오기
    const passwordInput = useRef();
    const { userName, userId, userPassword, userPasswordCheck } = user; // 비구조화 할당 사용
    const onInputChange = (e) => {
        const { id, value } = e.target; // e.target에서 입력한 input의 id와 value 추출
        setUser({
            // 기존 inputs 객체를 복사한 뒤 id의 값을 가진 value로 지정
            // React에서는 객체를 업데이트 시킬 때 반드시 기존 객체를 직접 수정하는 것이 아닌,
            // 새로운 객체를 만들어 변화시켜야함.
            ...user,
            [id] : value
        });
    }
    const onReset = (e) => {
        setUser({
            userName : '',
            userId : '',
            userPassword : '',
            userPasswordCheck : ''
        });
    }
    const onSignUpClick = async(e) => {
        // 입력하지 않은 칸이 존재할 경으
        if(user.userName.length === 0 || user.userId.length === 0 || 
            user.userPassword.length === 0 || user.userPasswordCheck === 0){
            alert('입력하지 않은 칸이 존재합니다!');
            e.preventDefault(); // submit 중단
        }else{
            // 비밀번호 확인이 틀릴 경우
            if(user.userPassword !== user.userPasswordCheck){
                alert('동일한 비밀번호가 아닙니다!');
                setUser({...user, userPassword: '', userPasswordCheck: ''}); // user State 초기화
                passwordInput.current.focus(); // password input에 포커스 지정
                e.preventDefault();
            }else{
                onReset(e);
                // e.preventDefault(); // submit 발생 시 reloading 막기
                alert('회원가입 되었습니다!');
                const request = await axios.post('http://192.168.35.47:5000/signup-action', {user});
                console.log("요청 데이터 : ",request.data);
            }
        }
    }
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
                            value={userName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className='id'>
                        <label htmlFor='userId'>ID</label>
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className='password'>
                        <label htmlFor='userPassword'>PASSWORD</label>
                        <input
                            id="userPassword"
                            type="password"
                            value={userPassword}
                            onChange={onInputChange}
                            ref={passwordInput} // 비밀번호 틀렸을 시 포커싱 지정
                        />
                    </div>
                    <div className='password_check'>
                        <label htmlFor='userPasswordCheck'>PASSWORD CHECK</label>
                        <input
                            id="userPasswordCheck"
                            type="password"
                            value={userPasswordCheck}
                            onChange={onInputChange}
                        />
                    </div>
                    <Link to="/login">
                        <button 
                            className='register_btn' onClick={onSignUpClick}>SIGN UP
                        </button>
                    </Link>
                </form>
            </section>
        </div>
    </div>
    );
}

export default Register;
