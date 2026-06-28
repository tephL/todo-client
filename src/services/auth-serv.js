const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function login(username, password){
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
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
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'delete', 
        credentials: 'include',
    });
    return res;
}
