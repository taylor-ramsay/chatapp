import React, { Component } from 'react';
import ChatGroup from './chatGroup/ChatGroup'
import UserSelector from './userSelector/UserSelector';

export default class ChatGroups extends Component {
  
  render() {
    const { setFocusedChat, onStartNewChat, users, chatGroups } = this.props;
    const currentUserEmail = localStorage.getItem('userEmail');

    const chatGroupsJSX = chatGroups.map((chat, i) => {
      let emails;
      const filteredEmails = chat.users.filter(u => u.email !== currentUserEmail);
      if(filteredEmails.length === 1){
        emails = filteredEmails[0].email;
      } else {
        emails = filteredEmails.map(e => e.email).join(', ');
      }
      return (
        <ChatGroup key={i} onChatClick={setFocusedChat} chatId={chat._id} emails={emails} />
      );
    });

    return (
      <div>
        <p>Available users:</p>
        <UserSelector
          options={users}
          onStartNewChat={onStartNewChat}
        />
        <br />
        <br />
        <p>Open Conversations:</p>
        {chatGroupsJSX}
      </div>
    )
  }
}
