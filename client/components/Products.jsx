import { useState, useEffect } from "react"
import axios from "axios"
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
        <div>
            {products.map(p => {
                return (
                    <section key={p.ProductID}>
                        <img src={getImage(p.Image)}></img>
                        <h2>{p.Name}</h2>
                        <p>{addCurrency(p.Price, "$")}</p>
                    </section>
                )
            })}
        </div>
    )
}