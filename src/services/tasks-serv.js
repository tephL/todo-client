const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchTasks(page, limit){
    return await fetch(`${BASE_URL}/api/tasks?page=${page}&limit=${limit}`, {
        method: 'get',
        credentials: 'include'
    });
}

