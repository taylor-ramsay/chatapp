import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './views/login/Login';
import Register from './views/register/Register';
import Chat from './views/chat/Chat';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
