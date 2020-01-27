import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import api from '../../utils/api';

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

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: '' });
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      api.login(email, password).then((res) => {
        if (res.data && res.data._id) {
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('userEmail', res.data.email);
          this.props.history.push('/chat');
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
      <>
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
          <Button onClick={(e) => this.handleFormSubmit(e)} variant="primary" type="submit">Submit</Button>
        </Form>
        <p>Not a user? Click <Link to='/register'>here</Link> to register.</p>
      </>
    );
  }
}

export default Login;
