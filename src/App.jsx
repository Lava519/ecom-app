import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product"
import Register from "./pages/Register";
import Login from "./pages/Login";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/product/:id" element={<Product></Product>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
