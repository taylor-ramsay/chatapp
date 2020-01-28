import React, { Component } from 'react';

import Message from './message/Message'
import ChatInput from './chatInput/ChatInput'
import './FocusedChat.css';
import { Badge } from 'react-bootstrap';

export default class FocusedChat extends Component {

  getUsersEmails = () => {
    const { focusedChat } = this.props;
    const currentUserEmail = localStorage.getItem('userEmail');
    if (focusedChat.users && focusedChat.users.length > 0) {
      return focusedChat.users.map((user, i) => {
        if(user.email !== currentUserEmail){
          return (
            <Badge key={i} variant="secondary">
              {user.email}
            </Badge>
          );
        }
      });
    } else {
      return null;
    }
  }

  getMessages = () => {
    const { messages } = this.props; 
    return messages.map((msg, i) => {
      return (
        <Message
          key={i}
          from={msg.fromEmail}
          msg={msg.msg}
        />
      );
    });
  }

  render() {
    const { focusedChat, onSendMessage } = this.props;
    const userEmailsJSX = this.getUsersEmails();
    const messagesJSX = this.getMessages();

    return (
      <>
        {userEmailsJSX}
        {messagesJSX}
        {Object.entries(focusedChat).length > 0 ? 
        <ChatInput
          chatGroup={focusedChat}
          onSendMessage={onSendMessage}/> : <p>Select a conversion to start chatting.</p>}
      </>
    );
  }
}
