import React, { Component } from 'react';
import OpenChat from './openChat/OpenChat'
import UserSelector from './userSelector/UserSelector';

import api from '../../utils/api';

export default class OpenChats extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      openChats: [],
      focusedChat: {}
    };
  }

  async componentDidMount() {
    const users = (await api.getUsers()).data;
    const currentUserEmail = localStorage.getItem('userEmail');
    const openChats = (await api.getOpenChats(currentUserEmail)).data;
    await this.setState({ users, openChats });
  }

  startNewChat = async (users) => {
    const currentUser = {
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail')
    };
    const allUsers = [...users, currentUser];
    console.log('allUsers:', allUsers)
    const newChat = (await api.createNewChat(allUsers)).data;
    this.setState({
      openChats: [...this.state.openChats, newChat]
    });
  }

  render() {
    const { users, openChats } = this.state;
    const { setFocusedChat } = this.props;
    const currentUserEmail = localStorage.getItem('userEmail');
    const openChatsJSX = openChats.map((chat, i) => {
      console.log('chat:', chat)
      let emails;
      const filteredEmails = chat.users.filter(u => u.email !== currentUserEmail);
      console.log('filteredEmails:', filteredEmails)
      if(filteredEmails.length === 1){
        emails = filteredEmails[0].email;
      } else {
        emails = filteredEmails.map(e => e.email).join(', ');
      }
      return (
        <OpenChat key={i} onChatClick={setFocusedChat} chatId={chat._id} emails={emails} />
      );
    });

    return (
      <div>
        <p>Available users:</p>
        <UserSelector
          options={users}
          onStartNewChat={this.startNewChat}
        />
        <br />
        <br />
        <p>Open Conversations:</p>
        {openChatsJSX}
      </div>
    )
  }
}
