import React from 'react';
import { Card } from 'react-bootstrap';

const OpenChat = (props) => {
  const { onChatClick, chatId, emails } = props;
  return (
    <Card onClick={() => onChatClick(chatId)}>
      <Card.Title>{emails}</Card.Title>
    </Card>
  );
}

export default OpenChat;

