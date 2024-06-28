import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./UploadAvatar.css";

export default function UploadAvatar({ toggle, defaultAvatar, userID }) {
  const [currentAvatar, setCurrentAvatar] = useState(defaultAvatar);
  const [hasChanged, setHasChanged] = useState(false);
  const nav = useNavigate();
  const upload = useRef(null);
  const triggerFileButton = (e) => {
    upload.current?.click();
  }

  async function sendImage() {
    const res = await fetch("http://localhost:3000/user/avatar", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authentication: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        Image: currentAvatar,
        UserID: userID,
      }),
    });
    if (res.status === 200) {
      nav(0)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if( hasChanged ) {
      sendImage();
    }
  };
  const setFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setHasChanged(true);
      setCurrentAvatar(reader.result);
    };
  };
  return (
    <div className="upload-avatar-container">
    <div onClick={toggle} className="overlay"></div>
    <a className="close" onClick={toggle}>
          X
    </a>
    <h2>Upload Avatar</h2>
    <div className="avatar-container">
      <img className="avatar" src={currentAvatar} />
    </div>
    <form className="avatar-form-container" onSubmit={handleFormSubmit}>
      <input onChange={setFile} className="hidden" ref={upload} type="file"></input>
      <button type="button" onClick={triggerFileButton}>Upload Photo</button>
      { hasChanged && <button type="submit">Apply</button>}
    </form>
  </div>
  )
}
