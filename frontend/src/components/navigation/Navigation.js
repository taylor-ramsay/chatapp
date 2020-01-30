import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import LoggedInContext from '../../LoggedInContext';

import api from '../../utils/api';

const Navigation = (props) => {
  const { title, emailAddress, onLogout } = props;
  
  return (
    <LoggedInContext.Consumer>
      {loggedInContext => {
        const { setLogin } = loggedInContext;
        return (
          <Navbar>
            <Navbar.Brand href="#home">{title}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {!!emailAddress &&
                <>
                  <Navbar.Text>Signed in as {emailAddress}</Navbar.Text>
                  <Nav.Link onClick={() => onLogout(setLogin)}>Logout</Nav.Link>
                </>
              }
            </Navbar.Collapse>
          </Navbar>
        );
      }}
    </LoggedInContext.Consumer>
  );
}

export default Navigation;
