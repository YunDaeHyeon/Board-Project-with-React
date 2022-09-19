import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Routes>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
