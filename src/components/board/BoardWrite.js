import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/auth";
import "./BoardWrite_style.css";

// 예, 아니요 판별 다이얼로그 (confirm)
const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") { 
        return; // 매개변수 onConfirm가 없거나 onConfirm이 함수가 아나라면 return 실행
    }
    if (onCancel && typeof onCancel !== "function") { // onCancle은 필수요소는 아님
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

function BoardWrite(){
    const auth = useAuth();
    const session = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [images, setImages] = useState(''); // 이미지 업로드 state
    // 글 정보 State
    const [write, setWrite] = useState({
        userNo: session[0].user_no,
        boardTitle: '', // 글 제목
        boardContent: '', // 글 내용
        boardWriter: `${session[0].user_name}`
    });
    const { boardTitle, boardContent } = write; // 비구조화 할당

    // 글 정보 리셋
    const onReset = (e) => {
        setWrite({
            userNo: session[0].user_no,
            boardTitle: '', // 글 제목
            boardContent: '', // 글 내용
            boardWriter: `${session[0].user_name}`
        });
    }

    // 글쓰기 Input onChange
    const onInputChange = (e) => {
        const { id, value } = e.target; // e.target에서 입력한 input의 id와 value 추출
        setWrite({
            ...write,
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


    const onBackButtonSuccess = () => { navigate('/board/list') };
    const onBackButtonCancle = () => { console.log("onBackButtonHandler : 취소(아니오)")};
    const onBackButtonHandler = 
        useConfirm(
            "취소하시겠습니까?",
            onBackButtonSuccess, // '예' 눌렀을 시
            onBackButtonCancle // '아니요' 눌렀을 시
        );
            //"onWritingHandler : 글쓰기 취소"
    const onWritingButtonCancle = () => { console.log(write)};
    const onWritingButtonSuccess = async () => {
        let formData = new FormData();
        // http의 body는 object가 아닌 json으로 받기에 객체를 json 형식으로 변경하여 전송해야한다.
        formData.append("write", JSON.stringify(write));
        formData.append("image", images[0]);
        const request = await axios.post(`http://${auth.serverIP}:5000/board-writing-action`, formData);//iconv-lite
            if(request.data === 'error'){
                alert('데이터를 저장하는 중 오류가 발생하였습니다.');
            }else if(request.data === 'success'){
                onReset();
                alert('성공적으로 저장하였습니다!');
                navigate('/board/list');
            }
        }
    const onWritingHandler = 
            useConfirm(
                "작성하시겠습니까?",
                onWritingButtonSuccess, // '예' 눌렀을 시
                onWritingButtonCancle, // '아니요' 눌렀을 시
            );

    // 이미지가 선택될 때 실행
    useEffect(()=>{
        onImagePreview();
        return () => onImagePreview();
        // useEffect에 두 번째 인자가 존재하지 않으면, rerender가 필요할 때 마다 호출
    });
    
    // 이미지 미리보기 함수
    const onImagePreview = () =>{
        // 이미지 state에 값이 존재하지 않으면 false 반환
        if(!images) return false;
        const imageElement = document.querySelector('.image_box');
        // FileReader() 객체 생성
        const reader = new FileReader();
        reader.onload = () => (
            imageElement.style.backgroundImage = `url(${reader.result})`
        );
        // 특정 Blob나 File에서 읽어오는 메서드. 읽어와지면 reader.result에 적용
        reader.readAsDataURL(images[0]);
    }

    // 이미지 선택시 호출되는 함수
    const onUpLoadImage = (e) =>{
        const image = e.target.files;
        console.log(image);
        setImages(image);
    }

    return(
        <div className="write_container">
            <h1>BoardWrite</h1>
            <form>
                <div className="write_view_container">
                    <div className="write_contentView_container">
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
                    <div className="write_imageView_container">
                        <p>미리보기</p>
                        <div className="image_box"></div>
                        {/* accept="image/*"는 이미지 파일만 업로드 가능 */}
                        <label htmlFor="image">이미지 업로드</label>
                        <input id="image" name="image" type="file" accept="image/*" onChange={onUpLoadImage}/>
                    </div>
                </div>
                <div className="handler_button_group">
                    <button type="button" className="backButton" onClick={onBackButtonHandler}>취소</button>
                    <button type="button" className="addButton" onClick={onWritingHandler}>완료</button>        
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;