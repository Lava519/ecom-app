import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(" ");
    const navigate = useNavigate();
    const changeUsername = (e) => {
        setUsername(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        try{
            const credentials = {username: username, password: password}
            const res = await axios.post("http://localhost:3001/login", credentials, {withCredentials: true});
            if(res.data.message){
                setMessage(res.data.message);
            } else {
                navigate("/")
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{

    },[])
    return (
        <main>
            <h1>Login</h1>
            <div>
                <p>Username</p>
                <input onChange={changeUsername} type="text"></input>
                <p>Password</p>
                <input onChange={changePassword} type="password"></input>
            </div>
            <button onClick={submit}>Login</button>
            <p>{message}</p>
            <Link to="/register">Don't have an account.</Link>
        </main>
    )
}