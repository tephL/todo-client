import { useState } from "react"
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
            console.log(res);
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setRegisterMessage(data?.message || 'Successfully created');
                setTimeout(() => navigate('/login', 3000));
            }
            if(!res.ok){
                const data = await res.json();
                console.log(data);
                setRegisterMessage(data?.message || '');
            }
        })
        .catch(e => {
        });
    }

    return (
        <div>
            <p>{ registerMessage }</p>
            Username: <input type="text" onChange={e => handleUsername(e.currentTarget.value)}/>
            Password: <input type="text" onChange={e => handlePassword(e.currentTarget.value)}/>
            <button onClick={register}>Register</button>
        </div>
    )
}

export default Register
