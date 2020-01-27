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
    const openChatsJSX = openChats.map((chat, i) => {
      const emails = (chat.users.map(u => u.email)).toString();
      return (
        <OpenChat key={i} onChatClick={setFocusedChat} chatId={chat._id} emails={emails} />
      );
    });

    return (
      <div>
        <UserSelector
          options={users}
          onStartNewChat={this.startNewChat}
        />
        {openChatsJSX}
      </div>
    )
  }
}
