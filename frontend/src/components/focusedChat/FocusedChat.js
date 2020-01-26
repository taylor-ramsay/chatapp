import React, { Component } from 'react';

import Message from './message/Message'
import ChatInput from './chatInput/ChatInput'
import './FocusedChat.css';

import { subscribeToChat } from '../../utils/sockets';

export default class FocusedChat extends Component {

  componentDidMount(){
    subscribeToChat((err, res) => {
      console.log("subscribed", res);
      console.log("subscribed", err);
    });
  }

  render() {
    return (
      <div className='focused-chat'>
        <Message />
        <ChatInput />
      </div>
    )
  }
}
