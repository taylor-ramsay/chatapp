import React from 'react';

const LoggedInContext = React.createContext({
  loggedIn: false,
  setLogin: () => {}
});

export default LoggedInContext;