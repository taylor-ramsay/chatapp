import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OpenChat = (props) => {
  const { onChatClick, chatId, emails } = props;
  return (
    <Card onClick={() => onChatClick(chatId)}>
      <Card.Title><Link>{emails}</Link></Card.Title>
    </Card>
  );
}

export default OpenChat;

