import axios from "axios";
import { useEffect } from "react";

function Home() {

    useEffect(()=>{
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/home");
                console.log(res);
            } catch (err) {
                console.log(err);
            }
            
        }
        getData();
    },[])

    return(
        <div>
            <h1>Hello World!</h1>
        </div>
    )

}
export default Home;