import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import OpenChats from '../../components/openChats/OpenChats';
import FocusedChat from '../../components/focusedChat/FocusedChat';

export class Chat extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={4}>
              <OpenChats />
            </Col>
            <Col md={8}>
              <FocusedChat />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Chat;