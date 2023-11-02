import React, { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from '../../Context/Auth/context';

const Login = (props) => {
  const context = useContext(LoginContext);
  
  const isLoggedIn = context.loggedIn;
  const canDo = props.capability ? context.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {okToRender ? props.children : null} {/* Render children only if okToRender is true */}
    </When>
  );
};

export default Login;
