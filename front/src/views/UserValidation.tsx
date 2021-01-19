import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const UserValidation = () => {
  const { isLoading, user } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (user !== undefined) {
      const { email } = user;
      console.log(email);
      console.log(user);
      fetch('http://localhost:3001/api/users', {
        method: 'post',
        headers: {
          'treasure-key': API_KEY,
        },
        body: JSON.stringify({ email }),
      }).then(() => {
        history.push('/');
      });
    }
  }, [user]);
  if (isLoading) {
    return (
      <Row>
        <Col>
          <Spinner color="primary" />
        </Col>
      </Row>
    );
  }

  return <></>;
};

export default UserValidation;
