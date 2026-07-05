import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import TasksManager from '@/pages/TasksManager';
import AuthLayout from '@/components/AuthLayout';
import ProtectedRoutes from '@/components/ProtectedRoutes';

function App() {
    return (
    <BrowserRouter>
        <AuthLayout>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/manager' element={<TasksManager/>}/>
                </Route>
            </Routes>
        </AuthLayout>
    </BrowserRouter>
    )
}

export default App
