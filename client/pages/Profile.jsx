import axios from "axios";
import Nav from "../components/Nav"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [isSeller, setSeller] = useState(false);
    useEffect(()=>{
        const getProfile = async()=>{
            try{
                const res = await axios.get("http://localhost:3001/login", {withCredentials: true});
                if (res.data.loggedIn){
                    setProfile(res.data[1])
                }else {
                    navigate("/")
                }
                console.log(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        getProfile();
    },[])
    return (
        <div className="main-container">
            <Nav/>
            <div  className="profile-container">
                <div className="profile-stats">
                    
                </div>
                <section className="items-container">
                    <div className="item-buttons">
                        <h2>Cart Items</h2>
                        {isSeller? (<h2>Selling Items</h2>): (<></>)}
                    </div>
                    <div className="products">

                    </div>
                </section>
            </div>
        </div>
    )
}