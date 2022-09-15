const express    = require('express');
const dbconfig   = require('./database.js')();
const connection = dbconfig.init(); // DB 연결
const app = express(); // express 모듈 불러오기
const cors = require('cors'); // cors 사용
const bodyParser = require('body-parser'); // bady-parser 사용

// configuration 
// React 클라이언트의 포트는 5000이므로 포트 분리
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

// routing (매핑)

// 유저 정보 가지오기 (get방식, response)
app.get('/call', (req, res) => {                  
  connection.query('SELECT * FROM user', (error, rows) => {  //쿼리문 
    if (error){
        console.log(error);
    }
    res.send(rows);
    });
});

// 유저 로그인 처리
app.post('/login-action', (req, res) => {
    const id = req.body.id;
    const password = req.body.pwd;
    const query = `SELECT user_id, user_password FROM USER WHERE user_id = '${id}' && user_password = '${password}'`;
    connection.query(query, (error, result) =>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            // 쿼리의 결과는 오브젝트(RowDataPacket)으로 넘어오기에 JSON 형식의 문자열로 파싱
            if(JSON.stringify(result) == '[]'){ // 쿼리 결과가 '[]'. 즉, 비어있는 오브젝트면 로그인 실패
                res.send('failure');
            }else{ // 그렇지 않으면 로그인 성공
                res.send('success');
            }
        }
    });
});

// 유저 회원가입 처리
app.post('/signup-action', (req, res) => {
    const query = `INSERT INTO USER(user_name, user_id, user_password, created_date) VALUES ( '${req.body.user.userName}','${req.body.user.userId}','${req.body.user.userPassword}',NOW())`;
    connection.query(query, (error) => {
        // 쿼리 날릴 때 에러 발생하면
        if(error){
            console.log("회원가입 처리 에러", error);
        }else{
            // 성공 시
            console.log("회원가입 성공");
        }
    })
})

app.listen(app.get('port'), () => {
    console.log('포트 넘버 : ' + app.get('port') + "에서 실행 중");
});