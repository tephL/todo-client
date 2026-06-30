import { useState, useEffect, useContext } from "react";

import * as taskServ from '@/services/tasks-serv.js';
import { TasksMessageContext } from "@/pages/TasksManager"

function TasksList(){
    const [ tasks, setTasks ] = useState([]);
    const [ page, setPage ] = useState(1);
    const { tasksError, setTasksMessage } = useContext(TasksMessageContext);

    useEffect(() => {
        taskServ.fetchTasks(page, 20)
        .then(async (res) => {
            if(res.status === 204) throw new Error(res.status);
            if(res.ok) return await res.json();
        })
        .then(data => {
            console.log(data);
            let tasks = data?.tasks;
            setTasks(tasks);
        })
        .catch(err => {
            if(err.message == 204){ return null } 
            else {
                setTasksMessage('There was an error getting the data');
            }
        });
    }, [page]);

    let displayTasks = tasks.map(t =>
        <tr key={t.task_id} data-task-id={t.task_id}>
            <td>{t.title}</td>
            <td>{t.description}</td>
            <td>{t.status}</td>
            <td>{t.category}</td>
            <td>
                <div>
                    <button onClick={() => handleDelete(t)}>Delete</button>
                </div>
            </td>
        </tr>
    );

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

    return (
        <div>
            <table>
            <colgroup>
                <col id="title"/>
                <col id="description"/>
                <col id="status"/>
                <col id="category"/>
            </colgroup>

            <thead>
                <tr>
                    <td>title</td>
                    <td>description</td>
                    <td>status</td>
                    <td>category</td>
                    <td>actions</td>
                </tr>
            </thead>

            <tbody>
                { displayTasks }
            </tbody>
            </table>
        </div>
    )
}

export default TasksList
