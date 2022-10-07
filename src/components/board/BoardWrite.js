import { useNavigate } from "react-router-dom";
import "./BoardWrite_style.css";

function BoardWrite(){
    const navigate = useNavigate();

    const onBackButtonHandler = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const onWritingHandler = () => {
        alert('작성 완료');
        navigate('/board/list');
    };
    return(
        <div className="write_container">
            <h1>BoardWrite</h1>
            <form>
                <div>
                    <label htmlFor="boardTitle">글 제목</label>
                    <input className="boardTitle"
                        id="boardTitle"
                        type="text"/>
                </div>
                <div>
                    <label htmlFor="boardContent">글 내용</label>
                    <input className="boardContent"
                        id="boardContent"
                        type="text"/>
                </div>
                <input type="file"/>
                <div className="handler_button_group">
                    <button className="backButton" onClick={onBackButtonHandler}>취소</button>
                    <button className="addButton" onClick={onWritingHandler}>완료</button>        
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;