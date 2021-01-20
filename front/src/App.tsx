import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Error404 from './views/Error404';
import Home from './views/Home';
import MyCollections from './views/MyCollections';
import MyItems from './views/MyItems';
import UserValidation from './views/UserValidation';
import { UserContext } from './context/userContext';
import ShareItem from './views/shareItem';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';
const App = () => {
  const { setUser } = useContext(UserContext);
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && user !== undefined) {
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
        });
    }
  }, [user]);

  return (
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
            <Route exact path="/items/:collectionId">
              <MyItems />
            </Route>
            <Route exact path="/user-validation">
              <UserValidation />
            </Route>
            <Route exact path="/share/:id">
              <ShareItem />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
