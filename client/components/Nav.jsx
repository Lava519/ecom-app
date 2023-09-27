import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import "../styles/Nav.css"

export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const getImage = (url)=>{
        return "../images/" + url + ".jpg"
    }
    useEffect(()=>{
        const getLogin = async ()=>{
            try{
                const res = await axios.get("http://localhost:3001/login", {withCredentials: true});
                setLoggedIn(res.data.loggedIn);
                if (res.data.loggedIn) {
                    setUser(res.data.user[0]);
                }
            }catch(err){
                console.log(err);
            }
        }
        getLogin();
    },[]);

    const logout =  async ()=>{
        try {
            const res = axios.post("http://localhost:3001/logout");
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="nav">
            <Link className="home-link" to="/">SHOP</Link>
            {loggedIn ?
                ((<Link className="avatar-container" to="/profile"><p>{user.Name}</p><img className="avatar" src={getImage(user.Avatar)} alt=""/></Link>)):
                (<Link to="/login" className="login-link">Login</Link>)
            }
            {loggedIn ?
                ((<Link onClick={()=>{logout()}} className="cart-link">Logout</Link>)):
                (<></>)
            }

        </div>
    );

}