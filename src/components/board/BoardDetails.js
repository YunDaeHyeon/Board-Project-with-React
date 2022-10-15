import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../authentication/auth";
import "./BoardDetails_style.css";

// 예, 아니요 판별 다이얼로그 (confirm)
const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") { 
        return; // 매개변수 onConfirm가 없거나 onConfirm이 함수가 아나라면 return 실행
    }
    if (!onCancel || typeof onCancel !== "function") { // onCancle은 필수요소는 아님
        return;
    }

    const confirmAction = () =>{
        if(window.confirm(message)){
            onConfirm();
        }else{
            onCancel();
        }
    }
    return confirmAction;
};

function BoardDetails(){
    const auth = useAuth();
    const navigate = useNavigate();
    const{ boardNo } = useParams(); // url params로 넘어온 값 캐치
    const session = JSON.parse(sessionStorage.getItem('user'));
    const [loading, setLoading] = useState(true);
    const [boardDetail, setBoardDetail] = useState({});
    
    // 첫 컴포넌트 마운트시 render
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.post(
                    `http://${auth.serverIP}:5000/board-datils-action`, { boardNo }
                );
                // 게시글이 존재하지 않을 때
                if(response.data === 'boardDetilasNULL'){
                    alert('게시글이 존재하지 않습니다!');
                    navigate(`/board/list`);
                // 서버 오류
                }else if(response.data === 'error'){
                    alert("서버 오류 발생");
                    navigate('/board/list');
                // 게시글 불러오기 성공
                }else if(Object.keys(response.data[0]).length !== 0){
                    setLoading(false);
                    /*  ISO 8601 -> KST (YYYY-MM-DD HH:mm:ss) 방법
                        1. 서버에서 전달되는 ISO 8601 형식 날짜를 new Date를 사용해 Date 객체로 변경 (하지만 UTC 기준)
                        2. 변경한 객체를 setHours를 이용해 UTC 시간에 KST 시간 (9시간)을 더해준다.
                        3. 그 뒤 다시 객체를 toISOString()을 이용해 ISO 8601 형식으로 변경
                        4. 문자 T를 공백으로 변경, 밀리세컨드 부분을 제외시키기
                    */
                    let date = new Date(response.data[0].board_date); // ISO -> Object
                    date.setHours(date.getHours() + 9) // Object -> '시간' KCT + 9
                    response.data[0].board_date = date.toISOString().replace('T', ' ').substring(0, 19); // T, 000Z => KR
                    setBoardDetail(response.data[0]);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [auth.serverIP, boardNo, navigate]);

    // 뒤로가기 Handler
    const onBackPageHandler = () => {
        navigate('/board/list');
    };

    // 수정하기 Handler
    const onBoardEditHandler = () => {
        // /board/edit으로 prop 넘기기 (URL 매핑)
        navigate('/board/edit', {
            state:{
                board : boardDetail,
            }
        });
    }

    // '예' 누르면 
    const onBoardDeleteSuccess = async () => {
        const response = await axios.post(
            `http://${auth.serverIP}:5000/board-deleting-action`,
            { 
                board_no : boardDetail.board_no,
                board_image : boardDetail.board_image
            }
        );
        if(response.data === 'error'){
            alert("서버 오류");
        }else if(response.data === 'success'){
            alert("삭제되었습니다!");
            navigate('/board/list');
        }
    }
    // '아니요' 누르면
    const onBoardDeletecancel = () => {console.log("onBoardDeleteHandler : 글 삭제 취소");}
    // 삭제하기 Handler
    const onBoardDeleteHandler = useConfirm(
        "삭제하시겠습니까?",
        onBoardDeleteSuccess,
        onBoardDeletecancel
    )
    
    return(
        <div>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="board-detail-container">
                        <header className="board-detail-header">
                            <p className="detail-no">{`No : ${boardDetail.board_no}`}</p>
                            <p className="detail-writer">{`작성자 : ${boardDetail.board_writer}`}</p>
                            <p className="detail-date">{`등록일 : ${(boardDetail.board_date).replace('T', ' ').substring(0,19)}`}</p>
                            <p className="detail-views">{`조회수 : ${boardDetail.board_views}`}</p>
                        </header>
                        <p className="detail-title">{`제목 : ${boardDetail.board_title}`}</p>
                        <div className="board-detail-content-container">
                            <div className="detail-content">
                                <p>{boardDetail.board_content}</p>
                            </div>
                            <div className="detail-image">
                                {
                                    boardDetail.board_image ? (
                                        <img
                                            className="image-box"
                                            src={ // boardImage가 존재하면 경로 지정, 없으면 empty_image (빈 사진) 반환
                                                require(`../../server/uploads/${boardDetail.board_image}`) }
                                            alt="img"
                                            />
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="button_group">
                                <button className="backButton" onClick={onBackPageHandler}>뒤로가기</button>
                                {   // 해당 게시글의 작성자라면
                                    session[0].user_no === boardDetail.user_no ? (
                                        <div className="authButton">
                                            <button className="boardEditButton" onClick={onBoardEditHandler}>수정</button>
                                            <button className="boardDeleteButton" onClick={onBoardDeleteHandler}>삭제</button>
                                        </div>
                                    ) : null
                                }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BoardDetails;