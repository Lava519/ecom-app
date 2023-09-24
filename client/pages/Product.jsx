import Nav from "../components/Nav"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

export default function Product() {
    const id = useLocation().pathname.split("/")[2];
    const [product, setProduct] = useState({});
    useEffect(()=>{
        const getProduct = async () =>{
            try {
                const res = await axios.get("http://localhost:3001/product/"+id, id);
                setProduct(res.data[0]);
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
        </>
    )
}