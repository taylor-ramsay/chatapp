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
      selectedUsers: [],
    };
  }

  handleUserSelectorChange = (selectedUsers) => {
    this.setState({ selectedUsers });
  }

  handleButtonClick = () => {
    const { selectedUsers } = this.state;
    if(selectedUsers && selectedUsers.length > 0){
      this.props.onStartNewChat(this.state.selectedUsers);
    }
  }

  render() {
    const { multiple, selectedUsers } = this.state;
    const { options } = this.props;
    const userId = localStorage.getItem('userEmail');
    const users = options.filter(o => o.email !== userId);
    
    return (
      <>
        <Typeahead
          id='userSelector'
          labelKey='email'
          multiple={multiple}
          options={selectedUsers.length > 8 ? [] : users}
          emptyLabel={selectedUsers.length > 8 ? 'Only 10 users are allowed' : 'No matches found.'}
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

