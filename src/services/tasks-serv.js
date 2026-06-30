const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchTasks(page, limit){
    return await fetch(`${BASE_URL}/api/tasks?page=${page}&limit=${limit}`, {
        method: 'get',
        credentials: 'include'
    });
}

export async function deleteTask(task_id){
    return await fetch(`${BASE_URL}/api/tasks/${task_id}`, {
        method: 'delete',
        credentials: 'include'
    });
}
