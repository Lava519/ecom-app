import axios from "axios";
import { useEffect } from "react";
import Nav from "../components/Nav";
import Products from "../components/Products";

function Home() {
    return(
        <div>
            <Nav/>
            <Products/>
        </div>
    )

}
export default Home;