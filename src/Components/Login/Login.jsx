import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { Button, Input, PasswordInput, Paper, Text } from '@mantine/core';
import { LoginContext } from '../../Context/Auth/context';
import { Navigate } from 'react-router-dom';

const Login = ({ redirect }) => {
  const [state, setState] = useState({ username: '', password: '', showPassword: false });
  const context = useContext(LoginContext);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.username && state.password) {
      context.login(state.username, state.password);
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <Paper padding="xl">
      <When condition={context.loggedIn}>
        <Button onClick={context.logout}>Log Out</Button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
            required
          />
          <div style={{ height: '15px' }}></div> {/* Replaced Spacer with a div */}
          <PasswordInput
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
            withVisibilityToggle
            required
          />
          <div style={{ height: '20px' }}></div> {/* Replaced Spacer with a div */}
          <Button type="submit">Login</Button>

          <When condition={context.error}>
            <div style={{ height: '15px' }}></div> {/* Replaced Spacer with a div */}
            <Text color="red">Invalid credentials. Please try again.</Text>
          </When>
        </form>
      </When>

      {/* Redirect to the specified route after login */}
      {context.loggedIn && <Navigate to={redirect} replace />}
    </Paper>
  );
};

export default Login;
