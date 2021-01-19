import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar';
import Error404 from './views/Error404';
import Home from './views/Home';
import MyCollections from './views/MyCollections';
import UserValidation from './views/UserValidation';

const App = () => (
  <>
    <Router>
      <NavBar />
      <Container className="mt-3">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/collections">
            <MyCollections />
          </Route>
          <Route exact path="/user-validation">
            <UserValidation />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Container>
    </Router>
  </>
);

export default App;
