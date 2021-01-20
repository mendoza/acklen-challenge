import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Button,
  Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showButtonForUser = () => {
    if (isLoading) return <Spinner color="light" />;
    return user ? (
      <Button onClick={() => logout()}>Log out</Button>
    ) : (
      <Button onClick={() => loginWithRedirect()}>Log in</Button>
    );
  };

  return (
    <Navbar color="dark" dark expand="md">
      <Link className="navbar-brand" to="/">
        My Treasure
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem active={window.location.pathname === '/collections/'}>
            <Link className="nav-link" to="/collections/">
              My Collections
            </Link>
          </NavItem>
        </Nav>
        <NavbarText>{showButtonForUser()}</NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
