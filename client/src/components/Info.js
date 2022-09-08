import { useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
// import Counter from 'Counter';

export default function Info() {
  const { user, logout } = useContext(authContext);

  // Show user Info
  return (
      <p className="UserInfo mb-auto">
        <span>Hello, {user.email} 
        <button type="button" onClick={logout}>Logout</button> 
        </span>
        {/* <Counter /> */}
      </p>
  );
};