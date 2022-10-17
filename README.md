# Board Project With React
해당 Repo는 React & Node.js(express)게시판을 제작하는 토이 프로젝트입니다.

---  
시작 : 2022년 9월 11일  
  
---  
설치한 라이브러리
```json
    "axios": "^0.27.2",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^2.0.19",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "react-transition-group": "^4.4.5",
    "urlencode": "^1.1.0",
    "web-vitals": "^2.1.4"
```
---  
22.10.17 기준 트리구조
  
```console
src/
├── App.js
├── authentication/
│   ├── RequireAuth.js
│   └── auth.js
├── components/
│   ├── Navigation.js
│   ├── Navigation_style.css
│   ├── NotFound.js
│   ├── User.js
│   ├── User_style.css
│   ├── board/
│   │   ├── BoardDetails.js
│   │   ├── BoardDetails_style.css
│   │   ├── BoardEdit.js
│   │   ├── BoardEdit_style.css
│   │   ├── BoardList.js
│   │   ├── BoardListPiece.js
│   │   ├── BoardListPiece_style.css
│   │   ├── BoardList_style.css
│   │   ├── BoardWrite.js
│   │   └── BoardWrite_style.css
│   ├── map/
│   │   └── MapContainer.js
│   └── paginate/
│       ├── BoardListPaginationAdapter.js
│       ├── Pagination.js
│       └── Pagination_style.css
├── images/
│   ├── backgroundImage.png
│   ├── empty_image.png
│   └── user.png
├── index.js
├── routes/
│   ├── Board.js
│   ├── Board_style.css
│   ├── Login.js
│   ├── Login_style.css
│   ├── Register.js
│   └── Register_style.css
└── server/
    ├── database.js (.gitignore)
    ├── server.js
    └── uploads/ (.gitignore)
```