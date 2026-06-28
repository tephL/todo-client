import { useState, useEffect, useRef } from "react";
import * as taskServ from '@/services/tasks-serv.js';

function TasksList(){
    const [ tasks, setTasks ] = useState([]);
    const [ displayTasks, setDisplayTasks ] = useState();
    const [ page, setPage ] = useState(1);
    const changeCtr = useRef(0);

    useEffect(() => {
        taskServ.fetchTasks(page, 20)
        .then(async (res) => {
            if(res.ok) return await res.json();
        })
        .then(data => {
            let { tasks } = data;
            setTasks(tasks);
            renderTasks(data.tasks);
        });
    }, [page]);

    function renderTasks(tasks){
        setDisplayTasks(tasks.map(t => 
            <tr key={t.task_id} data-task-id={t.task_id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
                <td>{t.category}</td>
                <td>
                    <div>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        ));
    }

    function handleDelete(){
        console.log(tasks);
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
