import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './Login.css';

import api from '../../utils/api';
import LoggedInContext from '../../LoggedInContext';

export class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleInputChange = (field, e) => {
    this.setState({
      error: '',
      [field]: e.target.value
    });
  }

  handleFormSubmit = (e, setLogin) => {
    e.preventDefault();
    this.setState({ error: '' });
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      api.login(email, password).then(async (res) => {
        if (res.data && res.data._id) {
          await setLogin(true);
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('userEmail', res.data.email);
          this.props.history.push('/chat');
          return;
        }
        else if (res.data) {
          this.setState({
            error: res.data
          });
        } else {
          this.setState({
            error: 'There was an error, try again.'
          });
        }
      });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <LoggedInContext.Consumer>
        {loggedInContext => {
          const { setLogin } = loggedInContext;
          return (
            <div className='login-container'>
              <Card className='login-card'>
                <h2>Login</h2>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => this.handleInputChange('email', e)} type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => this.handleInputChange('password', e)} type="password" placeholder="Password" />
                  </Form.Group>
                  {!!error && <Alert variant={'danger'}>{error}</Alert>}
                  <Button onClick={(e) => this.handleFormSubmit(e, setLogin)} variant="primary" type="submit">Submit</Button>
                </Form>
                <p>Not a user? Click <Link to='/register'>here</Link> to register.</p>
              </Card>
            </div>
          );
        }}
      </LoggedInContext.Consumer>
    );
  }
}

export default Login;
