import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './views/login/Login';
import Register from './views/register/Register';
import Chat from './views/chat/Chat';
import Navigation from './components/navigation/Navigation';
import api from './utils/api';

export class App extends Component {

  render() {
    const usersEmail = localStorage.getItem('userEmail');

    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chat" component={Chat}>
              {!usersEmail && <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
