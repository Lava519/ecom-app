import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItems from '../components/CartItems/CartItems'
import Nav from "../components/Nav/Nav";
import Post from "../components/Post/Post";
import ProfileSettings from "../components/ProfileSettings/ProfileSettings";


export default function Profile() {
  const nav = useNavigate();
  const [userID, setUserID] = useState(null);
  useEffect(()=> {
    if (!localStorage.getItem("authToken"))
      nav("/")
  async function getUserID() {
    const res = await fetch("http://localhost:3000/user/getUserID", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    if ( res.status == 200 ) {
        let data = await res.json();
        setUserID(data.id);
      }
  }
  getUserID();
  }, [])
  return (
    <>
      <Nav></Nav>
      <ProfileSettings></ProfileSettings>
      <CartItems id={userID}></CartItems>
    </>
  )
}
