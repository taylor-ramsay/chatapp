import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import ChatGroups from '../../components/chatGroups/ChatGroups';
import FocusedChat from '../../components/focusedChat/FocusedChat';
import Navigation from '../../components/navigation/Navigation'

import { setConnectedChat, subscribeToGroupMessage, connectToChat, startNewChatGroup, subscribeToJoinNewChatGroup } from '../../utils/sockets';
import api from '../../utils/api';

export class Chat extends Component {

  constructor() {
    super()
    this.state = {
      focusedChat: {},
      focusedMessages: [],
      users: [],
      chatGroups: []
    };
  }

  async componentDidMount() {
    const currentUserId = localStorage.getItem('userId');

    connectToChat(currentUserId);

    subscribeToJoinNewChatGroup((err, res) => {
      if (res) {
        const chatGroupsWithoutNewGroup = this.state.chatGroups.filter(c => c._id !== res.chatGroup._id);
        this.setState({
          chatGroups: [...chatGroupsWithoutNewGroup, res.chatGroup]
        });
      }
    });

    subscribeToGroupMessage((err, res) => {
      if (res) {
        const newMessage = {
          fromEmail: res.from,
          msg: res.msg,
          chatId: res.chatGroup._id
        };
        this.setState({
          focusedMessages: [...this.state.focusedMessages, newMessage],
        });
      }
    });

    const users = (await api.getUsers()).data;
    const currentUserEmail = localStorage.getItem('userEmail');
    const chatGroups = (await api.getChatGroups(currentUserEmail)).data;
    await this.setState({ users, chatGroups });

  }

  handleSendMessage = (msg, fromEmail) => {
    const { focusedChat } = this.state;
    api.patchChatWithNewMessage(focusedChat._id, msg, fromEmail);
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

  startNewChat = async (users) => {
    const currentUser = {
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail')
    };
    const allUsers = [...users, currentUser];
    const newChatGroup = (await api.createNewChatGroup(allUsers)).data;
    this.setState({
      chatGroups: [...this.state.chatGroups, newChatGroup]
    });
    startNewChatGroup(newChatGroup);
    this.setFocusedChat(newChatGroup._id);
  }

  handleLogout = (setLogin) => {
    api.logout().then((res) => {
      if(res.status === 200){
        setLogin(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const { focusedChat, focusedMessages, users, chatGroups } = this.state;
    const usersEmail = localStorage.getItem('userEmail');

    return (
      <>
        <Navigation
          title={"ChatApp"}
          emailAddress={usersEmail}
          onLogout={this.handleLogout}
        />
        <Container>
          <Row>
            <Col md={4}>
              <ChatGroups
                setFocusedChat={this.setFocusedChat}
                users={users}
                chatGroups={chatGroups}
                onStartNewChat={this.startNewChat}
              />
            </Col>
            <Col md={8}>
              <FocusedChat
                focusedChat={focusedChat}
                messages={focusedMessages}
                onSendMessage={this.handleSendMessage}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Chat;