import React from 'react';
import './Login.css';
import { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(authContext);

    // change useState with a value change whenever input data change
    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onSubmit = function (e) {
        e.preventDefault();

        axios.post('http://localhost:8080/users/login', { email, password })
            .then((response) => {
                console.log(response)
                const user = response.data
                login(user);
            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.data)
            });
    };

    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label></label>
                    <input type='email' name='email' placeholder="Email" size="50" value={email} onChange={onEmailHandler} />
                </div>
                <div>
                    <label></label>
                    <input type='password' name='password' placeholder="Password" size="50" value={password} onChange={onPasswordHandler} />
                </div>
                <div>
                    <button type='submit' name="commit">Login</button>
                </div>
            </form>
        </div>
    )
}