import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import "./ProfileSettings.css";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({});
  const [userID, setUserID] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
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
  const handleDisplayMessage = (error) => {
    setDisplayMessage(false);
    setErrorMessage(false);
    if (error) {
      setErrorMessage(true);
    }
    else {
      setDisplayMessage(true);
    } 
    setTimeout(()=> {
      setDisplayMessage(false);
      setErrorMessage(false);
    }, 1500);
  }
  const toggleUploadForm = () => {
    if (showUpload)
      setShowUpload(false);
    else
      setShowUpload(true);
  }
  return (
    <div className="user-profile-container">
      <div className="messages-container">
        {displayMessage && <p className="display-message">Successfully uploaded product</p>}
        {errorMessage && <p className="error-message">Something went wrong</p>}
      </div>
      <div className="user-profile">
        <div className="avatar-container">
          <img className="avatar" style={{maxWidth: 150}} src={profile.Avatar} /> 
        </div>
        <p className="name-title">Full Name</p>
        <p className="name">{profile.FullName}</p>
        <p className="name-title">Username</p>
        <p className="name">{profile.UserName}</p>
        {profile.Role === "Seller" && <button className="upload-button" onClick={()=>{toggleUploadForm()}}>Upload</button>}
        {showUpload && 
          <UploadForm displayMessage={handleDisplayMessage} toggle={toggleUploadForm} userID={userID}></UploadForm>
        }
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
