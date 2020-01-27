import React, { Component } from 'react';

import Message from './message/Message'
import ChatInput from './chatInput/ChatInput'
import './FocusedChat.css';

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
    if (focusedChat.users && focusedChat.users.length > 0) {
      return focusedChat.users.map((user) => {
        return user.email
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
    const userEmails = this.getUsersEmails();
    const messagesJSX = this.getMessages();

    return (
      <div className='focused-chat'>
        {userEmails && <h2>Chatting with {userEmails.toString()}</h2>}
        {messagesJSX}
        <ChatInput
          chatId={focusedChat._id}
          onSendMessage={onSendMessage}
        />
      </div>
    );
  }
}
