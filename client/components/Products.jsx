import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../styles/Products.css"

export default function Products() {
    const [products, setProducts] = useState([]); 
    useEffect(()=>{
        const getProducts = async () => {
            try{
                const res = await axios.get("http://localhost:3001/products");
                setProducts(res.data);
            }catch{

            }
        };
        getProducts()
    },[])

    const getImage = (url)=>{
        return "../images/" + url + ".jpg"
    }

    const addCurrency = (num, curr) => {
        return num + curr
    }

    return (
        <div class="products-container">
            {products.map(p => {
                return (
                    <Link to={"/product/" + p.ProductID} className="product-container" key={p.ProductID}>
                        <div className="product-image">
                            <img src={getImage(p.Image)}></img>
                        </div>
                        <h2 className="product-name">{p.Name}</h2>
                        <p className="product-price">{addCurrency(p.Price, "$")}</p>
                    </Link>
                )
            })}
        </div>
    )
}