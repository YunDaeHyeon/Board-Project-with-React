import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/auth";
import Content from "../components/Content";
import User from "../components/User";
import "./Home_style.css";

function Home(){
    const session = JSON.parse(sessionStorage.getItem('user'));
    const auth = useAuth();
    const navigate = useNavigate();

    console.log("렌더링 성공");

    // 로그아웃 버튼
    const onLogoutHandler = () => {
        alert('로그아웃하였습니다.');
        sessionStorage.removeItem('user'); // 사용자 session 제거
        auth.logout(); // 사용자 state 제거
        navigate('/login');
    }

    return (
        <div className="main_container">
        <header>
            <div className="header_container">
                <h1><p>To do List</p></h1>
                <ul className="navigation_main_bar">
                    <li><p>To do</p></li>
                    <li><p>Weather</p></li>
                    <li><p>Map</p></li>
                </ul>
                <ul className="navigation_util_bar">
                    <li onClick={onLogoutHandler}><p>Logout</p></li>
                    <li><p>Join</p></li>
                    <li><p>My Page</p></li>
                </ul>
            </div>
        </header>
        <section>
            <div className="section_container">
                <h1 className="title">메인 페이지</h1>
                <div className="section_wrap">
                    <article className="user_container">
                        <User
                            userName={session[0].user_name}
                            userId={session[0].user_id}
                            userRole={session[0].user_role}/>
                    </article>
                    <div className="content_container">
                        <Content/>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Home;