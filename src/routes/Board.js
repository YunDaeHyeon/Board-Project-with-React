import User from "../components/User";
import Navigation from "../components/Navigation";
import "./Board_style.css";
import { Outlet } from "react-router-dom";

function Board(){
    const session = JSON.parse(sessionStorage.getItem('user'));
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
                <Navigation/>
            </div>
        </header>
        <section>
            <div className="section_container">
                <h1 className="title">메인 페이지</h1>
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