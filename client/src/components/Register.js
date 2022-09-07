import React from 'react';
import './Login.css';
import { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useContext(authContext);

  // change useState with a value change whenever input data change
  const onNameHandler = (e) => {
    setUsername(e.target.value)
  }
  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  const onSubmit = function (e) {
    e.preventDefault();

    axios.post('http://localhost:8080/register', { username, email, password })
      .then((response) => {
        console.log("hahaha", response)
        const user = response.data
        register(user);
      })
      .catch((error) => {
        console.log("error+++", error.response);
        alert(error.response.data)
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label></label>
          <input type='username' name='username' placeholder="Username" size="50" value={username} onChange={onNameHandler} />
        </div>
        <div>
          <label></label>
          <input type='email' name='email' placeholder="Email" size="50" value={email} onChange={onEmailHandler} />
        </div>
        <div>
          <label></label>
          <input type='password' name='password' placeholder="Password" size="50" value={password} onChange={onPasswordHandler} />
        </div>
        <div>
          <button type='submit' name="commit">Register</button>
        </div>
      </form>
    </div>
  )
}