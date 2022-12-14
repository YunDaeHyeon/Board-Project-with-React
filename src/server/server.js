const express    = require('express');
const multer     = require('multer'); // multer 모듈
const fs         = require('fs'); // file system 모듈\
const path       = require('path');
const dbconfig   = require('./database.js')();
const cors       = require('cors'); // cors 사용
const bodyParser = require('body-parser'); // bady-parser 사용
const app        = express(); // express 모듈 불러오기
const connection = dbconfig.init(); // DB 연결

let writeImageName = ""; // 이미지 이름을 사용하기 위한 변수
let editImageName = ""; // 이미지 이름을 사용하기 위한 변수
// configuration 
// React 클라이언트의 포트는 5000이므로 포트 분리
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

const directory = fs.existsSync("./src/server/uploads");
if(!directory) fs.mkdirSync("./src/server/uploads");

// 이미지 업로드 처리(multer 모듈 사용)
const writeUpload = multer({
    // storage : 파일 저장 방식, 걍로, 파일 명, 사이즈 등 설정
    storage: multer.diskStorage({ // multer의 diskStorage를 통해 이미지가 서버 디스크에 저장되도록 지정
        destination(req, file, cb){ // disStorage의 destination 메소드로 저장 경로 지정
            cb(null, './src/server/uploads/'); // cb = callback
        },
        filename(req, file, cb){ // 파일 이름은 filename 메서드 사용
            const board = JSON.parse(req.body.write);
            // 이미지 파일 명명 규칙
            // 이미지 경로(uploads) + 게시글 작성자(boardWriter) + 사용자 식별자(user_no) + 업로드 날짜(Data.now()) + 파일 확장자(path.extname)
            // ex) 저스틴12293848274827.png
            const ext = path.extname(file.originalname);
            writeImageName = board.boardWriter+board.userNo+Date.now()+ext;
            cb(null, writeImageName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 최대 이미지 파일 용량 허용치
})

const editUpload = multer({
    // storage : 파일 저장 방식, 걍로, 파일 명, 사이즈 등 설정
    storage: multer.diskStorage({ // multer의 diskStorage를 통해 이미지가 서버 디스크에 저장되도록 지정
        destination(req, file, cb){ // disStorage의 destination 메소드로 저장 경로 지정
            cb(null, './src/server/uploads/'); // cb = callback
        },
        filename(req, file, cb){ // 파일 이름은 filename 메서드 사용
            const board = JSON.parse(req.body.edit);
            // 이미지 파일 명명 규칙
            // 이미지 경로(uploads) + 게시글 작성자(boardWriter) + 사용자 식별자(user_no) + 업로드 날짜(Data.now()) + 파일 확장자(path.extname)
            // ex) 저스틴12293848274827.png
            const ext = path.extname(file.originalname);
            editImageName = board.boardWriter+board.userNo+Date.now()+ext;
            cb(null, editImageName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 최대 이미지 파일 용량 허용치
})

// routing (매핑)
// 유저 로그인 처리
app.post('/login-action', (req, res) => {
    const id = req.body.id;
    const password = req.body.pwd;
    const query = `SELECT user_no, user_id, user_name, user_role FROM USER WHERE user_id = '${id}' && user_password = '${password}'`;
    connection.query(query, (error, result) =>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            // 쿼리의 결과는 오브젝트(RowDataPacket)으로 넘어오기에 JSON 형식의 문자열로 파싱
            if(Object.keys(result).length !== 0){
                console.log("로그인 성공");
                res.send(result);
            }else{
                console.log("로그인 실패");
                res.send('failure');
            }
        }
    });
});

// 유저 회원가입 처리
app.post('/signup-action', (req, res) => {
    const query = `INSERT INTO USER(user_name, user_id, user_password, create_date) VALUES ( '${req.body.user.userName}','${req.body.user.userId}','${req.body.user.userPassword}',NOW())`;
    connection.query(query, (error) => {
        // 쿼리 날릴 때 에러 발생하면
        if(error){
            console.log("회원가입 처리 에러", error);
            res.send('error');
        }else{
            // 성공 시
            console.log("회원가입 성공");
            res.send('success');
        }
    })
});

// 게시판 불러오기
app.get('/board-reading-action', (req, res) =>{
    const query = `SELECT board_no, board_title, board_image, board_writer, board_date, board_views FROM BOARD WHERE board_state = 1`
    connection.query(query, (error, result) => {
        if(error){
            console.log("게시판 불러오기 에러", error);
            res.send('error');
        }else{
            if(Object.keys(result).length !== 0){
                console.log("게시판 불러오기 성공");
                res.send(result);
            }else{
                console.log("게시글이 존재하지 않습니다.");
                res.send('boardListNULL');
            }
        }
    })
});

// 상세 글 불러오기
app.post('/board-datils-action', (req, res) => {
    // boardNo은 INT이지만 string으로 넘어오기에 parseInt를 사용하여 INT으로 바꿔야한다.
    const boardNo = parseInt(req.body.boardNo);
    const viewCountQuery = `UPDATE BOARD SET board_views = board_views + 1 WHERE board_no = ${boardNo}; `;
    const query = `SELECT board_no, user_no, board_title, board_content, board_image, board_writer, board_date, board_views FROM BOARD WHERE board_no = ${boardNo} AND board_state = 1; `;
    connection.query(viewCountQuery+query, (error, result) =>{
        if(error){
            console.log("불러오기 실패", error);
            res.send('error');
        }else{
            if(result[1].length !== 0){
                console.log("게시글 상세 정보 불러오기 성공");
                res.send(result[1]);
            }else{
                console.log("게시글이 존재하지 않습니다.");
                res.send('boardDetilasNULL');
            }
        }
    }) 
});

// 글쓰기 액션 처리
app.post('/board-writing-action', writeUpload.single('image'), (req, res, next) =>{
    const board = JSON.parse(req.body.write);
    let query = `INSERT INTO BOARD(user_no, board_title, board_content, board_image, board_writer, board_date) VALUES (${board.userNo},'${board.boardTitle}','${board.boardContent}','${writeImageName}','${board.boardWriter}',NOW())`;
    if(!req.file){ // 사진이 첨부되어있지 않으면
        query =  `INSERT INTO BOARD(user_no, board_title, board_content, board_writer, board_date) VALUES (${board.userNo},'${board.boardTitle}','${board.boardContent}','${board.boardWriter}',NOW())`;
    }
    // 퀴리 실행
    connection.query(query, (error)=>{
        if(error){
            console.log("글쓰기 실패", error);
            res.send('error');
        }else{
            console.log("글쓰기 성공");
            res.send('success');
        }
    })
});

/*
    1 case : 이미지가 있는 글(board.board_image)을 다른 이미지로 변경
    2 case : 이미지가 없는 글을 이미지 추가
    3 case : 이미지 없는 글 이미지 없음
    4 case : 이미지 있는 글(board.board_image) 이미지 변경 X
*/

// 글 수정 액션 처리
app.post('/board-editing-action', editUpload.single('image'), (req, res, next) => {
    const board = JSON.parse(req.body.edit);
    // 사진이 첨부되어 있으면 (이미지가 없는 글에 이미지 추가 O)
    let query = `UPDATE BOARD SET board_title = '${board.boardTitle}', board_content = '${board.boardContent}', board_image = '${editImageName}' WHERE board_no = '${board.boardNo}'`;
    if(!req.file){ // 사진이 첨부되어 있지 않으면 (이미지가 있는 글에 이미지 변경 X, 이미지가 없는 글에 이미지 추가 X)
        query = `UPDATE BOARD SET board_title = '${board.boardTitle}', board_content = '${board.boardContent}' WHERE board_no = '${board.boardNo}'`;
    }else if(board.boardImage && req.file){ // 이미지가 있는 글에 다른 이미지로 변경 (기존 이미지 삭제)
        fs.unlink(`./src/server/uploads/${board.boardImage}`, error => {
            if(error){ // 해당 파일이 존재하지 않을 경우(= 이미지가 없다가 새로 추가한 글)
                console.log("존재하지 않는 이미지입니다.");
            }else{
                console.log("이미지 삭제 성공"); // 이미지를 변경하면, 기존의 이미지는 삭제되어야함
            }
        });
    }
    // 쿼리 실행
    connection.query(query,(error) => {
        if(error){
            console.log("글 수정 실패", error);
            res.send('error');
        }else{
            console.log("글 수정 성공");
            res.send('success');
        }
    });
});

// 글 삭제 액션 처리
app.post('/board-deleting-action', (req, res) => {
    fs.unlink(`./src/server/uploads/${req.body.board_image}`, error => {
        if(error){ // 해당 파일이 존재하지 않을 경우
            console.log("이미지가 존재하지 않는 게시글입니다.");
        }else{
            console.log("이미지 삭제 성공");
        }
    });
    const query = `DELETE FROM BOARD WHERE board_no = ${req.body.board_no}`;
    connection.query(query, (error)=>{
        if(error){
            console.log("글 삭제 실패",error);
            res.send('error');
        }else{
            console.log("글 삭제 성공");
            res.send('success');
        }
    })
})

app.listen(app.get('port'), () => {
    console.log('포트 넘버 : ' + app.get('port') + "에서 실행 중");
});