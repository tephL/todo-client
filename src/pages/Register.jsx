import { useState } from "react"
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import * as authServ from '@/services/auth-serv.js';

function Register(){
    const [ newUser, setNewUser ] = useState({
        username: '',
        password: ''
    });
    const [ registerMessage, setRegisterMessage ] = useState('');
    const navigate = useNavigate();

    function handleUsername(v){
        setNewUser(nu => { return { ...nu, username: v } });
    }

    function handlePassword(v){
        setNewUser(nu => { return { ...nu, password: v } });
    }

    async function register(){
        console.log(newUser);
        if(String(newUser.username).length < 5) return setRegisterMessage('Username must be atleast 5 characters');
        if(String(newUser.password).length < 8) return setRegisterMessage('Password must be atleast 8 characters');

        await authServ.registerUser({ username: newUser.username, password: newUser.password })
        .then(async res => {
            if(!res.ok){
                const data = await res.json();
                throw new Error(data?.message || "Something went wrong");
            } else{
                return res;
            }
        })
        .then(res => {
            console.log(res);
            setRegisterMessage('Account successfully created');
            setTimeout(() => { navigate('/login') }, 3000);
        })
        .catch(e => {
            console.log(e);
            setRegisterMessage(e.message);
        });
    }

    return (
        <div>
            <p>{ registerMessage }</p>
            Username: <input type="text" onChange={e => handleUsername(e.currentTarget.value)}/>
            Password: <input type="text" onChange={e => handlePassword(e.currentTarget.value)}/>
            <button onClick={register}>Register</button>
            <p>Already have an account? <NavLink to={'/login'}>Login</NavLink></p>
        </div>
    )
}

export default Register
