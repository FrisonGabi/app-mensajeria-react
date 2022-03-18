import styled from "styled-components"

let user = localStorage.getItem("user")


const Nav = styled.nav`
    display:flex;
    justify-content:flex-end;
    box-shadow: 0 2px 3px rgb(0,0,0,0.3);
    background-color: #323c66;
`

const Ul = styled.ul`
    display:flex;
    justify-content:flex-end;
    list-style:none;
`
const Li = styled.li`
    padding:20px;
    margin-right:50px;

    &:nth-child(2):hover{
        color:#f11;
        cursor:pointer;
    }

`


const Navbar = () => {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location = "http://localhost:3000/login"
    }

    return(
        <Nav>
            <Ul>
                <Li>{user.toUpperCase()}</Li>
                <Li onClick={logout} >LogOut</Li>
            </Ul>
        </Nav>
    )
}


export default Navbar