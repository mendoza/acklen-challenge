import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar';
import Error404 from './views/Error404';
import Home from './views/Home';

const App = () => (
  <>
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
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
