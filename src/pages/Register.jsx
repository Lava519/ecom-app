import {useState} from 'react';

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
  const handleSubmitPress = () => {
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
      <h1>REGISTER</h1>
      <section>
        <label>First Name</label>
        <input onChange={handleFirstNameInput} type="text" />
        <label>Last Name</label>
        <input onChange={handleLastNameInput} type="text" />
      </section>
      <section>
        <label>Username</label>
        <input onChange={handleUsernameInput} type="text" />
        {!validUsername && <p className="warning">Not valid username</p>}
      </section>
      <section>
        <label>Password</label>
        <input onChange={handlePasswordInput} type="password" />
        {!validPassword && <p className="warning">Not valid password</p>}
        <label>Confirm Password</label>
        <input onChange={handleDPaswordInput} type="password" />
      </section>
      <button onClick={handleSubmitPress}>YO</button>
    </div>
  )
} 
