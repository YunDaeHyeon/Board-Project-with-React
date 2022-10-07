import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/auth";
import "./Navigation_style.css";

function Navigation(){
    const navigate = useNavigate();
    const auth = useAuth();
    // 로그아웃 버튼
    const onLogoutHandler = () => {
        alert('로그아웃하였습니다.');
        sessionStorage.removeItem('user'); // 사용자 session 제거
        auth.logout(); // 사용자 state 제거
        navigate('/login');
    }
    
    return(
        <>
        <ul className="navigation_util_bar">
            <li className="logout_button" onClick={onLogoutHandler}><p>Logout</p></li>
            <li><p>My Page</p></li>
        </ul>
        </>
    )
}

export default Navigation;