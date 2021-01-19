import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from 'reactstrap';

const NavBar = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">My Treasure</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/collections/">My Collections</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
          {user ? (
            <Button onClick={() => logout()}>
              Log out <i className="fa fa-logout" />
            </Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>Log in</Button>
          )}
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
