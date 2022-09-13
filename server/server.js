const express    = require('express');
const dbconfig   = require('./database.js')();
const connection = dbconfig.init();

const app = express();

// configuration 
app.set('port', process.env.PORT || 5000);

// routing
app.get('/save', (req, res) => {                             //DB에 접근할 수 있는 주소와
  connection.query('SELECT * FROM user', (error, rows) => {  //쿼리문 
    if (error){
        console.log(error);
    }
    res.send(rows);
    });
});

app.listen(app.get('port'), () => {
    console.log('포트 넘버 : ' + app.get('port') + "에서 실행 중");
});