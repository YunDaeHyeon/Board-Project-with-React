import User from "../components/User";
import Navigation from "../components/Navigation";
import "./Board_style.css";
import { Outlet, useNavigate } from "react-router-dom";

function Board(){
    const navigate = useNavigate();
    const session = JSON.parse(sessionStorage.getItem('user'));

    const onBoardListMoveHandler = () => {
        navigate('/board/list');
    }
    
    return (
        <div className="main_container">
        <header>
            <div className="header_container">
                <h1><p>게시판</p></h1>
                <ul className="navigation_main_bar">
                    <li><p onClick={onBoardListMoveHandler}>게시판</p></li>
                    <li><p>회원</p></li>
                    <li><p>Map</p></li>
                </ul>
                <Navigation/>
            </div>
        </header>
        <section>
            <div className="section_container">
                <div className="section_wrap">
                    <article className="user_container">
                        <User
                            userNo={session[0].user_no}
                            userId={session[0].user_id}
                            userName={session[0].user_name}
                            userRole={session[0].user_role}/>
                    </article>
                    <div className="content_container">
                        <div className="dashboard_container">
                            <h1 className="title">메인 페이지</h1>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Board;