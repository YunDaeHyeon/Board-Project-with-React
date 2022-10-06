import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./authentication/auth";
import RequireAuth from "./authentication/RequireAuth";

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
      <Route 
          path="/" 
          element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
            }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
