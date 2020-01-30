import React, { Component } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Register.css'

import api from '../../utils/api';

export class Register extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      success: ''
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
      api.register(email, password).then((res) => {
        console.log('res:', res)
        if (res.data && res.data._id) {
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('userEmail', res.data.email);
          this.setState({
            success: <span>You're now registered, please <Link to='login'>login</Link> with the credential you just created.</span>
          });
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
    const { error, success } = this.state;

    return (
      <div className='register-container'>
        <Card className='register-card'>
          <h2>Register</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => this.handleInputChange('email', e)} type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => this.handleInputChange('password', e)} type="password" placeholder="Choose a password" />
            </Form.Group>
            {(!!error || !!success) && <Alert variant={error ? 'danger' : 'success'}>{error || success}</Alert>}
            <Button onClick={(e) => this.handleFormSubmit(e)} variant="primary" type="submit">Register</Button>
          </Form>
          <p>Already a user? Click <Link to='/login'>here</Link> to login.</p>
        </Card>
      </div>
    );
  }
}

export default Register;
