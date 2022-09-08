import React from 'react';
import './Login.css';
import { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Login({ open, setOpen }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(authContext);
    const handleClose = () => setOpen(false);

    // change useState with a value change whenever input data change
    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onSubmit = function (e) {
        e.preventDefault();
        axios.post('/users/login', { email, password })
            .then((response) => {
                console.log(response)
                const user = response.data
                login(user);
                handleClose();
            })
            .catch((error) => {
                console.log(error.response);
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
                            Login
                        </div>
                        <div>
                            <input type='email' name='email' placeholder="Email" size="50" value={email} onChange={onEmailHandler} />
                        </div>
                        <div>
                            <label></label>
                            <input type='password' name='password' placeholder="Password" size="50" value={password} onChange={onPasswordHandler} />
                        </div>
                        <div>
                            <button type='submit'>Login</button>
                        </div>
                    </Box>
                </form>
            </Modal>
        </div>
    )
}
