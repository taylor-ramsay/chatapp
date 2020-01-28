import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import api from '../../utils/api';

const Navigation = (props) => {
  const { title, emailAddress } = props;

  const handleLogout = () => {
    api.logout();
    props.history.push('/login');
  };

  return (
    <Navbar>
      <Navbar.Brand href="#home">{title}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!!emailAddress && 
          <>
            <Navbar.Text>Signed in as {emailAddress}</Navbar.Text>
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
