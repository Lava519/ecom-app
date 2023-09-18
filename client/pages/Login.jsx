import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    useEffect(()=>{

    },[])
    return (
        <main>
            <h1>Login</h1>
            <div>
                <input type="text"></input>
                <input type="password"></input>
            </div>
            <button>Login</button>
        </main>
    )
}