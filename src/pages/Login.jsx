import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as authServ from '@/services/auth-serv.js';
import { AuthContext } from "@/components/AuthLayout";

function Login(){
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();
    const [ message, setMessage ] = useState();
    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    async function handleLogin(){
        if(username.length < 5) return setMessage("Username must be be atleast 5 characters");
        if(password.length < 8) return setMessage("Password must be be atleast 8 characters");

        const res = await authServ.login(username, password);
        const data = await res.json();
        if(!res.ok) return setMessage(data[0]?.msg || data?.message);
        if(res.ok) return setUser(data);
    }

    return (
        <div>
            <p>{message}</p>
            Username: <input onChange={(e) => setUsername(e.currentTarget.value)} type="text" />
            Password: <input onChange={(e) => setPassword(e.currentTarget.value)} type="password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
