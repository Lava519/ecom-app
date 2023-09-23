import { useEffect, useState } from "react";
import axios from "axios";

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
        <li>
            <ul>SHOP</ul>
            {loggedIn ?
                ((<ul><img src={getImage(user.Avatar)} alt=""/></ul>)):
                (<ul>Login</ul>)
            }
            {loggedIn ?
                ((<ul>Cart</ul>)):
                (<></>)
            }

        </li>
    );

}