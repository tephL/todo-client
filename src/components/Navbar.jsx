import { NavLink } from "react-router";

function Navbar(){
    return (
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/manager'}>Tasks Manager</NavLink>
        </nav>
    )
}

export default Navbar
