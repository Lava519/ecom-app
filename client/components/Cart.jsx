import { useState } from "react"
import axios from "axios"

export default function Cart({product, profile}){
    const [value, setValue] = useState(Number(0));
    const input = document.getElementById("cart-value");

    const increase = ()=> {
        let v = Number(value)+1;
        setValue(v);
        input.value = v;
    }

    const decrease = ()=> {
        let v = value-1;
        if (value > 0){
            setValue(v);
            input.value = v;
        }

    }

    const changeValue = (e) => {
        setValue(e.target.value*1);
        e.target.value*=1;
        console.log(value);
        if (e.target.value <= 0){
            e.target.value = Number(0);
            setValue(Number(0));
        }
    }

    const send = async () => {
        try {
            if (value > 0 && profile) {
                const res = await axios.post("http://localhost:3001/cart", {product: product, profile: profile, quantity: value}, {withCredentials: true});
                if (res.data.message) {
                    const putRes = await axios.put("http://localhost:3000/cart", {product: product, profile: profile, quantity: value}, {withCredentials: true});
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div>
                <button onClick={decrease}>-</button>
                <input type="number" defaultValue={value} onChange={changeValue} id="cart-value" />
                <button onClick={increase}>+</button>
            </div>
            <button onClick={send}>Add to Cart</button>
        </div>
    )

}