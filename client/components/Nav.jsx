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
        <div className="nav">
            <Link to="/">SHOP</Link>
            {loggedIn ?
                ((<Link className="avatar-container"><img className="avatar" src={getImage(user.Avatar)} alt=""/></Link>)):
                (<Link to="/login" className="login-link">Login</Link>)
            }
            {loggedIn ?
                ((<Link className="cart-link">Cart</Link>)):
                (<></>)
            }

        </div>
    );

}