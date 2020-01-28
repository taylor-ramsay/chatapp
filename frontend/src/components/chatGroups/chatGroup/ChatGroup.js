import React from 'react';
import { Card } from 'react-bootstrap';
import './ChatGroup.css';

const ChatGroup = (props) => {
  const { onChatClick, chatId, emails } = props;
  return (
    <Card onClick={() => onChatClick(chatId)}>
      <Card.Title><p className='chat-group-link'>{emails}</p></Card.Title>
    </Card>
  );
}

export default ChatGroup;

