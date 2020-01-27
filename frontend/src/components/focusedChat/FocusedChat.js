import React, { Component } from 'react';

import Message from './message/Message'
import ChatInput from './chatInput/ChatInput'
import './FocusedChat.css';
import { Badge } from 'react-bootstrap';

import { subscribeToChat, subscribeToPrivateMessage } from '../../utils/sockets';

export default class FocusedChat extends Component {

  componentDidMount() {
    const { onMessageReceived } = this.props;

    subscribeToChat((err, res) => {
      console.log("subscribed", res);
      console.log("subscribed", err);
    });

    subscribeToPrivateMessage((err, res) => {
      if (res) {
        const newMessage = {
          fromEmail: res.from,
          msg: res.msg
        };
        onMessageReceived(newMessage);
      }
    });

  }

  getUsersEmails = () => {
    const { focusedChat } = this.props;
    const currentUserEmail = localStorage.getItem('userEmail');
    if (focusedChat.users && focusedChat.users.length > 0) {
      return focusedChat.users.map((user) => {
        if(user.email !== currentUserEmail){
          return (
            <Badge variant="secondary">
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
    console.log('focusedChat:', focusedChat)
    const userEmailsJSX = this.getUsersEmails();
    const messagesJSX = this.getMessages();

    return (
      <>
        {userEmailsJSX}
        {messagesJSX}
        {Object.entries(focusedChat).length > 0 ? 
        <ChatInput
          chatId={focusedChat._id}
          onSendMessage={onSendMessage}/> : <p>Select a conversion to start chatting.</p>}
      </>
    );
  }
}
