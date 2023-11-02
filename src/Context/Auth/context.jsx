import React, { useState, useEffect, createContext } from 'react';
import cookie from 'react-cookies';
// import { decode } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';


const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [state, setState] = useState({
    loggedIn: false,
    can: can,
    login: login,
    logout: logout,
    user: { capabilities: [] },
    error: null,
  });

  function can(capability) {
    return state?.user?.capabilities?.includes(capability);
  }

  async function login(username, password) {
    let { loggedIn, token, user } = state;
    let auth = testUsers[username];
    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  }
  

  function logout() {
    setLoginState(false, null, {});
  }

  function validateToken(token) {
    if (!token || token.split(".").length !== 3) {
      console.error('Token Validation Error: Invalid token format');
      setLoginState(false, null, {}, 'Invalid token format');
      return;
    }
    try {
      let decodedUser = jwtDecode(token);
      if (decodedUser.capabilities && typeof decodedUser.capabilities === "string") {
        decodedUser.capabilities = JSON.parse(decodedUser.capabilities.replace(/'/g, '"'));
      }
      
      if(decodedUser.capabilities) {
        console.log("Current user's capabilities:", decodedUser.capabilities);
      } else {
        console.warn("User capabilities not defined in the decoded token");
        console.log("Full Decoded Token:", decodedUser);  // log the entire decoded token for debugging
      }
      
      setLoginState(true, token, decodedUser);
    } catch (e) {
      console.error('Token Decoding Error', e);
      setLoginState(false, null, {}, e);
    }
  }
  
  

  function setLoginState(loggedIn, token, user, error) {
    cookie.save('auth', token);
    console.log("Current user's capabilities:", user.capabilities); 
    setState({ ...state, token, loggedIn, user, error: error || null });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    console.log("Retrieved Token:", token);  // log the token for debugging
    if(token) {
      validateToken(token);
    }
  }, []);
  

  return (
    <LoginContext.Provider value={state}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;