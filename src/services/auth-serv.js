const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function login(username, password){
    return await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'post',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ username: username, password: password })
    });
    return res;
}

export async function logout(){
    return await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'delete', 
        credentials: 'include',
    });
}

export async function whoAmI(){
    return await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: 'include',
        method: 'get'
    })
}
