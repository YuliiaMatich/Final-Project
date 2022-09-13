import { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user")
    if (userString) {
      setUser({ ...JSON.parse(userString)  })
      setAuth(true)
    }
  },[])
  // Perform login process for the user & save authID, etc
  const login = function(user) {
    setAuth(true);
    localStorage.setItem("user", JSON.stringify(user))
    setUser({ ...user });
  };

  const logout = function() {
    localStorage.removeItem("user");
    setAuth(false);
    setUser(null);
  };

  const register = function(user) {
    setAuth(true);
    localStorage.setItem("user", JSON.stringify(user))
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