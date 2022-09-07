// import { useState } from 'react';
import { useContext } from 'react';
import Info from './components/Info';
import Login from './components/Login';
import Register from './components/Register';
import { authContext } from './providers/AuthProvider';
// import CounterProvider from 'providers/CounterProvider';
import './App.css';
import React from 'react';

export default function App() {
  const { auth } = useContext(authContext);

  return (
    <div className="App">
      {/* <CounterProvider> */}
        <h1>My App</h1>
        {/* {!auth && <Register />} */}
        {!auth && <Login />}
        {auth && <Info />}
      {/* </CounterProvider> */}
    </div>
  );
}