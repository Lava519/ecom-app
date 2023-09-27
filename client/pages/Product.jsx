import Nav from "../components/Nav"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Cart from "../components/Cart";

export default function Product() {
    const id = useLocation().pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [profile, setProfile] = useState({});
    useEffect(()=>{
        const getProduct = async () =>{
            try {
                const res = await axios.get("http://localhost:3001/product/"+id, id);
                const profileRes = await axios.get("http://localhost:3001/login", {withCredentials: true});
                setProduct(res.data[0]);
                setProfile(profileRes.data.user[0]);
            } catch(err) {
                console.log(err)
            }
        }
        getProduct();
    },[])
    const getImage = (url)=>{
        if(url)
            return "../images/" + url + ".jpg"
        return "";
    }
    return(
        <>
            <Nav/>
            <img src={getImage(product.Image)}></img>
            <h1>{product.Name}</h1>
            <p>{product.Description}</p>
            <h2>{product.Price}</h2>
            <Cart product={product} profile={profile}/>
        </>
    )
}