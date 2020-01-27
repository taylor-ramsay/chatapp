import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, InputGroup, Button } from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export class UserSelector extends Component {

  constructor() {
    super()
    this.state = {
      multiple: false,
      selectedUsers: []
    };
  }

  handleUserSelectorChange = (selectedUsers) => {
    this.setState({ selectedUsers });
  }

  handleButtonClick = () => {
    this.props.onStartNewChat(this.state.selectedUsers);
  }

  render() {
    const { multiple } = this.state;
    const { options } = this.props;

    return (
      <>
        <Typeahead
          id='userSelector'
          labelKey='email'
          multiple={multiple}
          options={options}
          placeholder='Select someone to chat with...'
          onChange={this.handleUserSelectorChange}
        />
        <InputGroup>
          <Form.Check
            checked={multiple}
            onChange={(e) => this.setState({ multiple: e.target.checked })}
            label='Select multiple'
            type='checkbox' />
        </InputGroup>
        <br />
        <Button
          onClick={this.handleButtonClick}>
          Start new conversation
        </Button>
      </>
    );
  }
}

export default UserSelector;

