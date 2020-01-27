import React from 'react';
import { Card } from 'react-bootstrap';

const Message = (props) => {
  return (
    <Card>
      <Card.Body>
        From: {props.from}
        Msg: {props.msg}
      </Card.Body>
    </Card>
  );
}

export default Message;
