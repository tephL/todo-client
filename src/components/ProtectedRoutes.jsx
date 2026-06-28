import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router"
import { AuthContext } from "@/components/AuthLayout";
import Navbar from '@/components/Navbar';
import * as authServ from '@/services/auth-serv.js';

function ProtectedRoutes(){
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        authServ.whoAmI()
            .then(async (res) => 
                res.ok ? 
                setUser(await res.json()) : 
                navigate('/login') 
            );
    }, []);

    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default ProtectedRoutes
