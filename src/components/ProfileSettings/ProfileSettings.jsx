import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettings() {
  const [fullName, setFullName] = useState(null);
  const [username, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    async function authenticate() {
      const res = await fetch("http://localhost:3000/user/authenticate", {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      if (res.status === 200) {
        const data = await res.json().then( (x) => x.data[0]);
        console.log(data);
        setFullName(data.FullName);
        setUserName(data.UserName);
        setAvatar(data.Avatar);
      }
    }
    authenticate();
  }, [])
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    nav('/');
  }
  return (
    <div>
      <img style={{maxWidth: 150}} src={avatar} />
      <p>Full Name: {fullName}</p>
      <p>Username: {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
