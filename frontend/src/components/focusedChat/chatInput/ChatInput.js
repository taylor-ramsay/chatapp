import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { sendGroupMessage } from '../../../utils/sockets';

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
    const { chatGroup, onSendMessage } = this.props;
    const from = localStorage.getItem('userEmail');
    const message = {
      msg,
      from,
      chatGroup,
    };
    sendGroupMessage(message);
    onSendMessage(msg, from);
    this.setState({ msg: '' });
  }

  render() {
    const { msg } = this.state;
    
    return (
      <InputGroup className="mb-3">
        <FormControl
          value={msg}
          placeholder="Say hello"
          aria-label="Say hello"
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
