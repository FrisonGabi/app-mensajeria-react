import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Navbar from "./components/Navbar";

const App = () => {
  return (
    
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
