import React from 'react';
import { Jumbotron } from 'reactstrap';

const Error404 = () => (
  <Jumbotron>
    <h1 className="display-3">Error 404!</h1>
    <p className="lead">Well this is awkward...</p>
    <hr className="my-2" />
    <p>Either we did an error or you did...</p>
  </Jumbotron>
);

export default Error404;
