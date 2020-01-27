import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import OpenChats from '../../components/openChats/OpenChats';
import FocusedChat from '../../components/focusedChat/FocusedChat';

import { setConnectedChat } from '../../utils/sockets';
import api from '../../utils/api';

export class Chat extends Component {

  constructor() {
    super()
    this.state = {
      focusedChat: {},
      focusedMessages: []
    };
  }

  handleMessageReceived = (message) => {
    this.setState({
      focusedMessages: [...this.state.focusedMessages, message]
    });
  }

  handleSendMessage = () => {
    // this.setState({
    //   docusedMessages: [...this.state.focusedMessages]
    // });
  }

  setFocusedChat = async (chatId) => {
    const focusedChat = (await api.getChat(chatId)).data;
    const focusedMessages = focusedChat.msgHistory ? focusedChat.msgHistory : [];
    setConnectedChat(focusedChat._id);
    this.setState({ 
      focusedChat,
      focusedMessages
    });
  };

  render() {
    const { focusedChat, focusedMessages } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col md={4}>
              <OpenChats
                setFocusedChat={this.setFocusedChat}
              />
            </Col>
            <Col md={8}>
              <FocusedChat
                focusedChat={focusedChat}
                messages={focusedMessages}
                onSendMessage={this.handleSendMessage}
                onMessageReceived={this.handleMessageReceived}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Chat;