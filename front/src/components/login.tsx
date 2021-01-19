import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </div>
  );
};

export default Login;
