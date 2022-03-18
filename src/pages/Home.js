import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import DivC from "../components/DivC";


const Home = () => {
   // const user = localStorage.getItem("user");

    if(!localStorage.getItem("token")){
        return(
            <div>
                <Link to="/login">Debe iniciar sesion</Link>
                <p>O</p>
                <Link to="/register">Registro</Link>
            </div>
        )
    }

    
    return (

        <DivC>
            <Navbar/>
            
    

        </DivC>
    )   
}

export default Home