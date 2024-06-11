import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dpassword, setDPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const [validPassword, setValidPassword] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validFName, setvalidFName] = useState(true);
  const [validLName, setvalidLName] = useState(true);
  const [samePassword, setSamePassword] = useState(true);
  const [uniqueUsername, setUniqueUsername] = useState(true);
  const nav = useNavigate();
  async function submitToDB() {
    const res = await fetch("http://localhost:3000/user/register", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      fname: `${fName} ${lName}`, 
      username: username,
      password: password,
      })
    })
    if (res.status === 200) {
      nav("/login", {state:{registered: true}});
    }
    else if (res.status === 202) {
      setUniqueUsername(false);
    }
  }

  const handleFirstNameInput = (e) => {
    setFName(e.target.value);
    if(e.target.value.length < 2)
      setvalidFName(false);
    else
      setvalidFName(true);
  }
  const handleLastNameInput = (e) => {
    setLName(e.target.value);
    if(e.target.value.length < 2)
      setvalidLName(false);
    else
      setvalidLName(true);
  }
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    if (e.target.value < 5)
      setValidUsername(false);
    else {
      setValidUsername(true);
      setUniqueUsername(true);
    }
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5)
      setValidPassword(false);
    else
      setValidPassword(true);
  }
  const handleDPaswordInput = (e) => {
    setDPassword(e.target.value);
  }
  const handleSubmitPress = (e) => {
    e.preventDefault();
    if (password != dpassword)
      setSamePassword(false);
    else if (validUsername && validPassword && validFName && setvalidLName) {
      setSamePassword(true);
      submitToDB();
    }
  }

  return (
    <div>
      <Nav></Nav>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmitPress}>
          <h2 className="register-form-title">REGISTER</h2>
          <section className="register-name-container">
            <p className="first-name">First Name:</p>
            <input className="first-name-input" onChange={handleFirstNameInput} type="text" />
            {!validFName && <p className="warning warning-name">Minimum 2 characters required</p>}
            <p className="last-name">Last Name:</p>
            <input className="last-name-input" onChange={handleLastNameInput} type="text" />
            {!validLName && <p className="warning warning-name">Minimum 2 characters required</p>}
          </section>
          <section className="register-username-container">
            <p className="userame">Username:</p>
            <input className="username-input" onChange={handleUsernameInput} type="text" />
            {!validUsername && <p className="warning">Minimum 5 characters required</p>}
            {!uniqueUsername && <p className="warning">Username already exists</p>}
          </section>
          <section className="register-password-container">
            <p className="password">Password:</p>
            <input className="password-input" onChange={handlePasswordInput} type="password" />
            {!validPassword && <p className="warning">Minimum 5 characters required</p>}
            <p className="password-confirm">Confirm Password:</p>
            <input className="password-confirm-input" onChange={handleDPaswordInput} type="password" />
            {!samePassword && <p className="warning">Passwords do not match</p>}
          </section>
          <button className="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
} 
