import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';

const UserValidation = () => {
  const { setUser } = useContext(UserContext);
  const { isLoading, user } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (user !== undefined) {
      const { email } = user;
      axios
        .post(
          `${API_HOST}/api/users`,
          { email },
          {
            headers: {
              'treasure-key': API_KEY,
            },
          },
        )
        .then(({ data }) => {
          setUser({ email: data.userInfo.email, id: data.userInfo._id });
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
