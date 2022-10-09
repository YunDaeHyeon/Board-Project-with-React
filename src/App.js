import {
  Routes,
  Route,
} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Login from "./routes/Login";
import Register from "./routes/Register";
import Board from "./routes/Board";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./authentication/auth";
import RequireAuth from "./authentication/RequireAuth";
import BoardList from "./components/board/BoardList";
import BoardWrite from "./components/board/BoardWrite";
import BoardEdit from "./components/board/BoardEdit";

/*
  사용자 인증 없이 접근 가능한 컴포넌트
  <Login>, <Register>, <NotFound>

  인증이 필요한 컴포넌트
  <Home>
*/
function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Navigate to="/board/list"/>}/>
          <Route path="/board" element={<Navigate to="/board/list"/>}/>
          <Route 
            path="/board"
            replace={false}
            element={<RequireAuth><Board/></RequireAuth>}>
              <Route path="list" index element={<BoardList/>}/>
              <Route path="write" element={<BoardWrite/>}/>
              <Route path="edit" element={<BoardEdit/>}/>
          </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
