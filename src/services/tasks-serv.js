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

export async function createTask({ title, description, category }){
    console.log(category);
    return await fetch(`${BASE_URL}/api/tasks`, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, description: description, category: category })
    });
}

        
export async function updateTask({ task_id, title, description, category, status }){
    // const updates = Object.fromEntries(
    //     Object.entries({ title, description, category, status }).filter(([key, value]) => {
    //         console.log(key);
    //         console.log(value);
    //         return value != null || value != '' || value != undefined;
    //     })
    // );
    const updates = { task_id: task_id, title: title, description: description, category: category, status: status };
    console.log(updates);
    return await fetch(`${BASE_URL}/api/tasks/${task_id}`, {
        credentials: 'include', 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ ...updates })
    });
}
