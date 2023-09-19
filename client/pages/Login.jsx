import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const changeUsername = (e) => {
        setUsername(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        try{
            const credentials = [username, password]
            const res = await axios.post("http://localhost:3001/login", {username: credentials[0], password: credentials[1]});
            console.log(res.data)
            if(res.data.message){
                setMessage(res.data.message);
            } else {
                console.log(res.data);
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
            <p>{message}</p>
            <button onClick={submit}>Login</button>
        </main>
    )
}