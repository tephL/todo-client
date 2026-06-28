import { useContext } from "react";
import { AuthContext } from '@/components/AuthLayout';

function Home(){
    const { user, setUser } = useContext(AuthContext);

    return (
        <>
            <h1>Welcome {user?.username}</h1>
        </>
    )
}

export default Home
