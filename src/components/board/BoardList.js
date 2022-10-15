import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoardList_style.css";
import { useAuth } from "../../authentication/auth";
import BoardListPiece from "./BoardListPiece";
import Pagination from "../paginate/Pagination";
import BoardListPaginationAdapter from "../paginate/BoardListPaginationAdapter";

    /*  
    *   컴포넌트에서 board 데이터를 동적으로 가져오기에 state 사용
    *   effect hook을 사용하여 rendering 이후 fecth, 그 뒤 state 갱신
    *   effect hook은 반환값이 없거나 clean-up 함수만을 사용해야한다. 따라서 async를 effect를 직접적으로 사용하면 허용되지 않아
    *   아래와 같이 간접적으로 활용하였음.
    */

    /*
        페이지네이션 로직

    */

function BoardList(){
    const auth = useAuth();
    const navigate = useNavigate();
    // 로딩 state
    const [loading, setLoading] = useState(true);
    // 게시글 state
    const [board, setBoard] = useState([]);
    // 페이지네이션 state
    const [startPage, setStartPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(6); // 백엔드에서 불러온 게시글의 개수를 numberOfPage만큼 등분해서 보여준다.

    /* 페이지네이션 */
    const indexOfLast = startPage * numberOfPage; // 해당 페이지의 마지막 index (1*6)
    const indexOfFirst = indexOfLast - numberOfPage; // 해당 페이지의 첫 번째 index (6-6)
    
    /* 페이지네이션 함수 */
    const currentPosts = (posts) => {
        let currentPosts = 0;
        // 시작 index와 끝 index를 기준으로 slice를 함수로 데이터를 분할시킨다.
        // ! slice(begin, end) => 배열의 begin번째 ~ end-1번째까지의 데이터를 새로 생성해 반환하는 함수
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

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
                    setLoading(false);
                    setBoard([]); // board state 초기화
                // 서버 오류
                }else if(response.data === 'error'){
                    alert("서버 오류 발생");
                // 게시글이 하나 이상 존재할 때
                }else if(Object.keys(response.data).length !== 0){
                    setLoading(false);
                    setBoard(response.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [auth.serverIP]);
    
    return(
        <>
            <section className="dashboard_section">
                {
                    loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
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
                                {Object.keys(board).length !== 0 ?
                                    (
                                        <BoardListPaginationAdapter
                                            board={currentPosts(board)}
                                        />
                                    ) : (
                                            <td colSpan={6} className="board-is-null">게시글이 존재하지 않습니다.</td>
                                        )
                                }
                            </tbody>
                        </table>
                        <Pagination
                        numberOfPage={numberOfPage} // 각 페이지 당 게시글 개수
                        totalPosts={board.length} // 전체 게시글 개수
                        paginate={setStartPage} // startPage state를 변경하는 setter
                        /*
                            사용자가 선택한 페이지 number에 따라 startPage의 state가 변경된다.
                            사용자가 3번째 페이지를 선택할 시, startPage state를 사용한 indexOfLast, indexOfFirst의 값 또한 변경된다.
                        */
                        />
                    </>
                    )
                }
            </section>
            <button className="writingButton" onClick={onBoardWriteHandler}>글쓰기</button>
        </>
    );
}

export default BoardList;