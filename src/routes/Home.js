import { useEffect, useState } from "react";
import Content from "../components/Content";
import User from "../components/User";
import "./Home_style.css";

function Home({auth}){
    const [session, setSession] = useState('');
    useEffect(()=>{
        setSession(auth);
    }, []);
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
                    <li><p>Login</p></li>
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
                        <User/>
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