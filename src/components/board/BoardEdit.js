import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/auth";
import "./BoardEdit_style.css";

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

function BoardEdit(){
    const auth = useAuth();
    // BoardDetail에서 넘어온 props
    const { state } = useLocation();
    const navigate = useNavigate();
    const [images, setImages] = useState(''); // 이미지 업로드 state

    // 글 정보 state
    const [edit, setEdit] = useState({
        userNo : state.board.user_no,
        boardNo : state.board.board_no,
        boardTitle : state.board.board_title,
        boardContent : state.board.board_content,
        boardImage : state.board.board_image,
        boardWriter: state.board.board_writer
    });
    const { boardTitle, boardContent } = edit;

    // 이미지 선택 effect
    useEffect(() => {
        onImagePreview();
        return () => onImagePreview();
    });

    // 이미지 미리보기
    const onImagePreview = () => {
        const imageElement = document.querySelector('.image_box');
        // 이미지 state에 값이 존재하지 않으면 Detail에서 넘어온 이미지 출력
        if(!images){ //../../server/uploads/
            return false;
        }
        const reader = new FileReader();
        reader.onload = () => {
            imageElement.style.backgroundImage = `url(${reader.result})`
        };
        // 특정 Blob나 File에서 읽어오는 메서드. 읽어와지면 reader.result에 적용
        reader.readAsDataURL(images[0]);
    }

    // 이미지 선택
    const onUpLoadImage = (e) => {
        const image = e.target.files;
        console.log(image);
        setImages(image);
    }

    // 글 정보 리셋
    const onReset = (e) => {
        setEdit({
            userNo : state.board.user_no,
            boardTitle : state.board.board_title,
            boardContent : state.board.board_content,
            boardImage : state.board.board_image,
            boardWriter: state.board.board_writer
        });
        setImages('');
    }

    // 글 수정 onchange
    const onInputChange = (e) => {
        const { id, value } = e.target;
        setEdit({
            ...edit,
            [id] : value
        });
    }

    // textArea에서 Tab처리
    const onTabClick = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
            let val = e.target.value;
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            e.target.value = val.substring(0, start) + "\t" + val.substring(end);
            e.target.selectionStart = e.target.selectionEnd = start + 1;
            onInputChange(e);
            return false; //  prevent focus
        }
    };

    // 글 수정 버튼 클릭 '예'
    const onBoardEditSuccess = async () => {
        let formData = new FormData();
        formData.append('edit', JSON.stringify(edit));
        formData.append('image', images[0]);
        const response = await axios.post(`http://${auth.serverIP}:5000/board-editing-action`, formData);
        if(response.data === 'error'){
            alert('데이터를 수정하는 중 오류가 발생하였습니다.');
        }else if(response.data === 'success'){
            onReset();
            alert('성공적으로 반영되었습니다!');
            navigate('/board/list');
        }
    }

    // 글 수정 버튼 클릭 '아니요'
    const onBoardEditCancel = () => { console.log("onBoardEditSuccessHandler : 글 수정 취소");}
    const onBoardEditSuccessHandler = useConfirm(
        '수정하시겠습니까?',
        onBoardEditSuccess,
        onBoardEditCancel
    )

    // 뒤로가기 버튼 클릭 '예'
    const onBackPageMove = () => { 
        setImages('');
        navigate('/board/list')
    }
    // 뒤로가기 버튼 클릭 '아니요'
    const onBackPageMoveCancel = () => { console.log("onBackPageMoveHandler : 뒤로가기 취소");}
    const onBackPageMoveHandler = useConfirm(
        '취소하시겠습니까?',
        onBackPageMove,
        onBackPageMoveCancel
    )

    return(
        <div className="edit_container">
            <h1>BoardEdit</h1>
            <form>
                <div className="edit_view_container">
                    <div className="edit_contentView_container">
                        <div>
                            <label htmlFor="boardTitle">글 제목</label>
                            <input className="boardTitle"
                                id="boardTitle"
                                value={boardTitle}
                                onChange={onInputChange}
                                type="text"/>
                        </div>
                        <div>
                            <label htmlFor="boardContent">글 내용</label>
                            <textarea className="boardContent"
                                id="boardContent"
                                value={boardContent}
                                onKeyDown={onTabClick}
                                onChange={onInputChange}
                                type="text"/>
                        </div>
                    </div>
                    <div className="edit_imageView_container">
                        <p>미리보기</p>
                        {
                            !images ? (
                                <img
                                style={{width:300, height: 300, backgroundRepeat: "no-repeat"}}
                                src={
                                    edit.boardImage !== null ? require(`../../server/uploads/${edit.boardImage}`) : 
                                    require('../../images/empty_image.png')
                                }
                                alt="img"
                                />
                            ) : (
                                <div className="image_box"></div>
                            )
                        }
                        {/* accept="image/*"는 이미지 파일만 업로드 가능 */}
                        <label htmlFor="image">이미지 업로드</label>
                        <input id="image" name="image" type="file" accept="image/*" onChange={onUpLoadImage}/>
                    </div>
                </div>
                <div className="handler_button_group">
                    <button type="button" className="backButton" onClick={onBackPageMoveHandler}>뒤로가기</button>
                    <button type="button" className="addButton" onClick={onBoardEditSuccessHandler}>완료</button>        
                </div>
            </form>
        </div>
    );
}

export default BoardEdit;