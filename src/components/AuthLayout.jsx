import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

function AuthLayout({ children }){
    const [ user, setUser ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if(user) navigate('/');
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthLayout
