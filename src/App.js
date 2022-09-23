import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NotFound from "./components/NotFound";

/*
  사용자 인증 없이 접근 가능한 컴포넌트
  <Login>, <Register>, <NotFound>

  인증이 필요한 컴포넌트
  <Home>
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
