import { useContext, useState, useRef } from "react"

import { TasksMessageContext, TasksContext } from "@/pages/TasksManager"
import * as taskServ from '@/services/tasks-serv.js';

function NewTaskWindow(){
    const { setTasksMessage } = useContext(TasksMessageContext);
    const { newTaskWindowVisibility, setNewTaskWindowVisibility } = useContext(TasksMessageContext);

    const { tasks, setTasks } = useContext(TasksContext);

    const titleInputRef = useRef(null);
    const categoryInputRef = useRef(null);

    const [ newTaskMessageBox, setNewTaskMessageBox ] = useState('');
    const [ newTask, setNewTask ] = useState({
        title: '',
        description: '',
        category: '',
    });

    async function handleSubmit(){
        console.log(newTask);
        if(newTask.title == ''){
            titleInputRef.current.focus();
            return setNewTaskMessageBox('Title must be provided');
        };

        if(newTask.category == ''){
            categoryInputRef.current.focus();
            return setNewTaskMessageBox('Category must be chosen');
        };

        await taskServ.createTask(newTask)
        .then(async res => {
            console.log(res);
            if(!res.ok) throw new Error("Unable to create the task");
            return await res.json();
        })
        .then(data => {
            setTasks(ts => [...ts, data]);
            console.log(data);
            setNewTaskWindowVisibility(true);
            setNewTaskMessageBox('');
            setTasksMessage("Successfully created task");
        })
        .catch(e => {
            console.log(e);
            setNewTaskWindowVisibility(true);
            setTasksMessage(e?.message);
        });

    }

    function handleCategorySelection(e){
        const chosen_category = `${e.currentTarget.innerHTML}`.toLowerCase();
        setNewTask((nt) => { return { ...nt, category: chosen_category }});
    }

    function exitNewTask(){
        console.log(newTaskWindowVisibility);
        setNewTaskWindowVisibility(true);
    }

    return (
        <div hidden={newTaskWindowVisibility}>
            <button onClick={exitNewTask}>x</button>
            <p>{ newTaskMessageBox }</p>
            <p>New task</p>
            <button onClick={exitNewTask}>x</button>
            <input ref={titleInputRef} onChange={e => setNewTask(nt => { return { ...nt, title: e.target.value } })} placeholder="Title" type="text" />
            <textarea onChange={e => setNewTask(nt => { return { ...nt, description: e.target.value } })} cols="30" rows="10" placeholder="Description"></textarea>
            <div ref={categoryInputRef}>
                <p onClick={handleCategorySelection}>Brainrot</p>
                <p onClick={handleCategorySelection}>Sahur</p>
                <p onClick={handleCategorySelection}>W-maxxing</p>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default NewTaskWindow
