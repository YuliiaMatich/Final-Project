import React from 'react';
import './Login.css';
import { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Register({ open, setOpen }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useContext(authContext);
  const handleClose = () => setOpen(false);

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

    axios.post('/register', { username, email, password })
      .then((response) => {
        const user = response.data
        register(user);
      })
      .catch((error) => {
        alert(error.response.data)
      });
  };

  return (

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={onSubmit}>
          <Box align="right">
            <div id="modal-modal-title" variant="h6" component="h2">
              Register
            </div>
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
              <button type='submit'>Register</button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  )
}