import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const UserValidation = () => {
  const { isLoading } = useAuth0();
  const history = useHistory();

  if (isLoading) {
    return (
      <Row>
        <Col>
          <Spinner color="primary" />
        </Col>
      </Row>
    );
  }
  history.push('/');
  return <></>;
};

export default UserValidation;
