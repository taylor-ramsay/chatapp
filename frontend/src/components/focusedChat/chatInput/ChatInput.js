import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { sendPrivateMessage } from '../../../utils/sockets';

export class ChatInput extends Component {

  constructor() {
    super()
    this.state = {
      msg: '',
    };
  }

  handleInputChange = (e) => {
    const msg = e.target.value;
    this.setState({ msg });
  }

  handleSend = () => {
    const { msg } = this.state;
    const { chatId, onSendMessage } =this.props;
    const from = localStorage.getItem('userEmail');
    const message = {
      msg,
      from,
      chatId
    };
    sendPrivateMessage(message);
    onSendMessage();
  }

  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => this.handleInputChange(e)}
        />
        <InputGroup.Append>
          <Button onClick={this.handleSend} variant="outline-secondary">Send</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
};

export default ChatInput;
