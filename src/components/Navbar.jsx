import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";

import * as authServ from '@/services/auth-serv.js';
import { AuthContext } from "@/components/AuthLayout";

function Navbar(){

    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    async function handleLogout(){
        if(!window.confirm('Are you sure you want to log out?')) return;
        await authServ.logout()
        .then(res => {
            console.log(res);
            if(res.ok){
                setUser(undefined);
                navigate('/login');
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/manager'}>Tasks Manager</NavLink>
            <a onClick={handleLogout}>Logout</a>
        </nav>
    )
}

export default Navbar
