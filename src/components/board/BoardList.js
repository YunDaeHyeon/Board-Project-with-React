import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoardList_style.css";
import { useAuth } from "../../authentication/auth";
import BoardListPiece from "./BoardListPiece";

    /*  
    *   컴포넌트에서 board 데이터를 동적으로 가져오기에 state 사용
    *   effect hook을 사용하여 rendering 이후 fecth, 그 뒤 state 갱신
    *   effect hook은 반환값이 없거나 clean-up 함수만을 사용해야한다. 따라서 async를 effect를 직접적으로 사용하면 허용되지 않아
    *   아래와 같이 간접적으로 활용하였음.
    */

function BoardList(){
    const auth = useAuth();
    const navigate = useNavigate();
    const [board, setBoard] = useState({});
    const onBoardWriteHandler = () =>{
        navigate('/board/write');
    }

    // 첫 컴포넌트 마운트에만 render
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(
                    `http://${auth.serverIP}:5000/board-reading-action`
                );
                // 게시판이 비어있을 때
                if(response.data === 'boardListNULL'){
                    setBoard({}); // board state 초기화
                // 서버 오류
                }else if(response.data === 'error'){
                    alert("서버 오류 발생");
                // 게시글이 하나 이상 존재할 때
                }else if(Object.keys(response.data).length !== 0){
                    setBoard(response.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return(
        <>
            <section className="dashboard_section">
                <table className="dashboard_table">
                    <thead>
                        <tr>
                            <th className="board_no">No</th>
                            <th className="board_image">사진</th>
                            <th className="board_title">제목</th>
                            <th className="board_writer">작성자</th>
                            <th className="board_create_date">등록일</th>
                            <th className="board_views">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // 게시글이 존재할 때 (Object.values는 value로 이루어진 !! 배열 !!을 반환한다. )
                            board ? (Object.values(board)).map((element) => (
                                <BoardListPiece
                                    key={element.board_no}
                                    boardNo={element.board_no}
                                    boardTitle={element.board_title}
                                    boardImage={element.board_image}
                                    boardWriter={element.board_writer}
                                    boardDate={element.board_date}
                                    boardViews={element.board_views}/>
                            ))
                                : (
                                    <tr><td>게시글이 존재하지 않습니다.</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
            <button className="writingButton" onClick={onBoardWriteHandler}>글쓰기</button>
        </>
    );
}

export default BoardList;