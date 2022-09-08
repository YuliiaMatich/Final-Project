import { createContext, useState } from 'react';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Perform login process for the user & save authID, etc
  const login = function(user) {
  //   if (user.email === "" || user.password === ""){
  //     // return "Please fill login form"
  //     setAuth(false);
  // } else {
    setAuth(true);
    setUser({ ...user });
  // }
  };

  const logout = function() {
    setAuth(false);
    setUser(null);
  };

  const register = function(user) {
    setAuth(true);
    setUser({ ...user });
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout, register };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};