import {useState} from 'react';
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
  const [samePassword, setSamePassword] = useState(true);
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
    if (res.status == 202) {
      const data = res.json();
      console.log(data.message);
    }
     
    else
      console.log(res);
  }

  const handleFirstNameInput = (e) => {
    setFName(e.target.value);
  }
  const handleLastNameInput = (e) => {
    setLName(e.target.value);
  }
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    if (username.length < 3)
      setValidUsername(false);
    else
      setValidUsername(true);
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
    else if (validUsername && validPassword) {
      console.log(`${fName} ${lName}`);
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
            <p className="last-name">Last Name:</p>
            <input className="last-name-input" onChange={handleLastNameInput} type="text" />
          </section>
          <section className="register-username-container">
            <p className="userame">Username:</p>
            <input className="username-input" onChange={handleUsernameInput} type="text" />
            {!validUsername && <p className="warning">Not valid username</p>}
          </section>
          <section className="register-password-container">
            <p className="password">Password:</p>
            <input className="password-input" onChange={handlePasswordInput} type="password" />
            {!validPassword && <p className="warning">Not valid password</p>}
            <p className="password-confirm">Confirm Password:</p>
            <input className="password-confirm-input" onChange={handleDPaswordInput} type="password" />
          </section>
          <button className="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
} 
