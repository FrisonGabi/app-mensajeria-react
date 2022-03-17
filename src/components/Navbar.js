import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(
        <div>
            <ul>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="register">Register</NavLink></li>
                <li><NavLink to="">Home</NavLink></li>
            </ul>
        </div>
    )
}


export default Navbar