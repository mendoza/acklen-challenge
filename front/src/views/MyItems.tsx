import React from 'react';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// const API_KEY = process.env.REACT_APP_API_KEY || '';
// const API_HOST = process.env.REACT_APP_API_HOST || '';
const MyItems = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  if (isLoading) {
    return <Spinner color="primary" />;
  }

  if (!user) {
    history.push('/');
  }

  return (
    <div>
      <p>wenas</p>
    </div>
  );
};

export default MyItems;
