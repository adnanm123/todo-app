import React, { useContext, useState } from 'react';
import { Button, Input, Text } from '@mantine/core';
import { Link } from 'react-router-dom'; // Import Link
import { LoginContext } from '../../Context/Auth/context'; 
import Logout from '../Login/Login'; 
import './Header.scss';

function Header() {
  const context = useContext(LoginContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    context.login(credentials.username, credentials.password);
  };

  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/">Home</Link> {/* Add a link to the Home route */}
        <Link to="/settings">Settings</Link> {/* Add a link to the Settings route */}
      </nav>
      <div className="login-container">
        {context.loggedIn ? (
          <>
            <Text>Welcome, {context.user.name}!</Text>
            <Logout />  
          </>
        ) : (
          <>
            <Input
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="login-input"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="login-input"
            />
            <Button onClick={handleLogin}>Login</Button>
            {context.error && <p>{context.error.message}</p>}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
