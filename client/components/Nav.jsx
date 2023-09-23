import { useEffect, useState } from "react";
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
                    console.log(res.data);
                    setUser(res.data.user[0]);
                }
            }catch(err){
                console.log(err);
            }
        }
        getLogin();
    },[]);

    return (
        <li className="nav">
            <ul>SHOP</ul>
            {loggedIn ?
                ((<ul className="avatar-container"><img className="avatar" src={getImage(user.Avatar)} alt=""/></ul>)):
                (<ul className="login-link">Login</ul>)
            }
            {loggedIn ?
                ((<ul className="cart-link">Cart</ul>)):
                (<></>)
            }

        </li>
    );

}