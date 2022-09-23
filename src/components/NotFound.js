import { useLocation } from "react-router-dom";


export default function NotFound(){
    const location = useLocation();
    return(
        <div className="notfound_container">
            <h1><code>{location.pathname}</code>올바르지 않은 경로입니다.</h1>
        </div>
    );
}