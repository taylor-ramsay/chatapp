import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
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
          placeholder='Choose a state...'
          onChange={this.handleUserSelectorChange}
        />
        <InputGroup>
          <FormControl
            checked={multiple}
            onChange={(e) => this.setState({ multiple: e.target.checked })}
            placeholder="Recipient's username"
            type='checkbox' />
        </InputGroup>
        <Button
          onClick={this.handleButtonClick}>
          Start new chat
        </Button>
      </>
    );
  }
}

export default UserSelector;

