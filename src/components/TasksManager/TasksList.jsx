import { useState, useEffect, useContext } from "react";

import * as taskServ from '@/services/tasks-serv.js';
import { TasksMessageContext, TasksContext } from "@/pages/TasksManager"

function TasksList(){
    const { tasks, setTasks } = useContext(TasksContext);
    const [ page, setPage ] = useState(1);
    const { setTasksMessage }  = useContext(TasksMessageContext);
    const { setNewTaskWindowVisibility }  = useContext(TasksMessageContext);

    useEffect(() => {
        taskServ.fetchTasks(page, 20)
        .then(async (res) => {
            if(res.status === 204) throw new Error(res.status);
            if(res.ok) return await res.json();
        })
        .then(data => {
            let tasks = data?.tasks;
            setTasks(tasks);
        })
        .catch(err => {
            if(err.message == 204){ 
                return null ;
            } 
            else {
                setTasksMessage('There was an error getting the data');
            }
        });
    }, [page]);

    let displayTasks = tasks.map(t => {
        return <div>
            <button onClick={() => handleDelete(t)}>x</button>
            
            <p>{t.title}</p>
            <p>{t.description}</p>
            <p>{t.category}</p>
        </div>
    });

    async function handleDelete(task){
        if(!window.confirm(`Are you sure you want to delete '${task.title}'?`)) return;
        const remaining = tasks.filter(t => t.task_id !== task.task_id);

        taskServ.deleteTask(task.task_id)
        .then(async res => {
            if(!res.ok) throw new Error();
            setTasks(remaining);
            setTasksMessage('Successfully deleted');
        })
        .catch(err => {
            console.log(err);
            setTasksMessage('Something went wrong');
        });

    }

    function toggleNewTask(){
        setNewTaskWindowVisibility(false);
    }

    return (
        <div>
            <button onClick={toggleNewTask}>New Task</button>
            { 
                tasks.length === 0 ? 
                <p>'No task'</p> :
                displayTasks 
            }
        </div>
    )
}

export default TasksList
