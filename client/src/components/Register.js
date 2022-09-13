import React from 'react';
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
  const [error, setError] = useState(false);

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
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return setError("Please fill registration form")
    }
    axios.post('/register', { username, email, password })
      .then((response) => {
        const user = response.data
        register(user);
      })
      .catch((error) => {
        setError(error.response.data)
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
              <button type='submit' style={{ color: "black" }}>Register {error} </button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  )
}