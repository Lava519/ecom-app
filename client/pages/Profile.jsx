import axios from "axios";
import Nav from "../components/Nav"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css"

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [cart, setCart] = useState([]);
    const [isSeller, setSeller] = useState(false);
    useEffect(()=>{
        const getProfile = async()=>{
            try{
                const resLogin = await axios.get("http://localhost:3001/login", {withCredentials: true});
                console.log(resLogin.data);
                if (resLogin.data.loggedIn){
                    setProfile(resLogin.data.user[0])
                }else {
                    navigate("/")
                }
                const id = resLogin.data.user[0].UserID;
                const resCart = await axios.get("http://localhost:3001/cart", {params: {id: id}});
                console.log
                setCart(resCart.data);
            }catch(err) {
                console.log(err);
            }
        }
        getProfile();
    },[])
    const getImage = (url)=>{
        if (url)
            return "../images/" + url + ".jpg"
        return ""
    }
    const addCurrency = (num, curr) => {
        return num + curr
    }
    return (
        <div className="main-container">
            <Nav/>
            <div  className="profile-container">
                <div className="profile-stats">
                    <img src={getImage(profile.Avatar)}/>
                    <p>{profile.Name}</p>
                    <Link>Change Username</Link>
                    <Link>Change Password</Link>
                    <Link>Remove Account</Link>
                </div>
                <section className="items-container">
                    <div className="item-buttons">
                        <h2>Cart Items</h2>
                        {isSeller? (<h2>Selling Items</h2>): (<></>)}
                    </div>
                    <div className="products-container">
                        {cart.map(c => {
                            return (
                            <Link to={"/product/" + c.ProductID} className="product-container" key={c.OrderID}>
                                <div className="product-image">
                                    <img src={getImage(c.Image)}></img>
                                </div>
                                <h2 className="product-name">{c.Name}</h2>
                                <p className="product-price">{addCurrency(c.Price, "$")}</p>
                            </Link>
                        )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}