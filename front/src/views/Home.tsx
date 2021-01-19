import React from 'react';
import { Col, Row } from 'reactstrap';

const Home = () => (
  <div id="front-page">
    <Row>
      <Col>
        <h1>Welcome to My Treasure</h1>
        <p>
          The web app that lets you control your collections, tells you the total price for your
          collection and even share items
        </p>
        <h2>Why should you use this app?</h2>
        <ol>
          <li>Open source</li>
          <li>All your data is safe</li>
          <li>once you delete your info from our app is gone for real</li>
        </ol>
      </Col>
      <Col>
        <img src="/assets/treasure.png" id="front-page-logo" alt="Logo" />
      </Col>
    </Row>
  </div>
);

export default Home;
