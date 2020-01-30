import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './views/login/Login';
import Register from './views/register/Register';
import Chat from './views/chat/Chat';
import LoggedInContext from './LoggedInContext';

export class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: localStorage.getItem('userId') ? true : false
    }
  }

  setLogin = async (bool) => {
    await this.setState({ loggedIn: bool });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <LoggedInContext.Provider value={{ ...this.state, setLogin: this.setLogin }}>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/chat" /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/chat" component={Chat}>
                {!loggedIn && <Redirect to="/login" />}
              </Route>
            </LoggedInContext.Provider>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
