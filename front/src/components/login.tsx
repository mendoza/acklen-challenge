import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';

const Login = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  console.log(user);
  return (
    <div>
      <Button
        onClick={() =>
          loginWithRedirect().then((data) => {
            console.log(data);
          })
        }
      >
        Login
      </Button>
      <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
};

export default Login;
