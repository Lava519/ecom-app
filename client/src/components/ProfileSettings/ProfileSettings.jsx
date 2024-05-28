import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';

export default function ProfileSettings() {
  const [profile, setProfile] = useState({});
  const [userID, setUserID] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  useEffect(() => {
    async function getUserID() {
      const res = await fetch("http://localhost:3000/user/getUserID", {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      const data = await res.json();
      setUserID(data.id);
    }
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
        setProfile(data);
        getUserID();
      }
    }
    authenticate();
  }, [])
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    nav('/');
  }
  const toggleUploadForm = () => {
    if (showUpload)
      setShowUpload(false);
    else
      setShowUpload(true);
  }
  return (
    <div>
      <img style={{maxWidth: 150}} src={profile.Avatar} />
      <p>Full Name: {profile.FullName}</p>
      <p>Username: {profile.UserName}</p>
      {profile.Role === "Seller" && <button onClick={()=>{toggleUploadForm()}}>Upload</button>}
      {showUpload && 
        <UploadForm toggle={toggleUploadForm} userID={userID}></UploadForm>
      }
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
