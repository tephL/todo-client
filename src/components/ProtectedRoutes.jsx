import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router"
import { AuthContext } from "@/components/AuthLayout";

function ProtectedRoutes(){
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if(!user) navigate('/login');
    }, []);

    return (
        <Outlet/>
    )
}

export default ProtectedRoutes
