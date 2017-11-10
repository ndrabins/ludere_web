import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import AddIcon from "material-ui-icons/Add";

class CreateChatButton extends Component {
  render() {
    return (
      <div>
        <IconButton style={{width:26, height:26, color: "white", background: 'linear-gradient(to right, #e57373, #ee8d68)'}}>
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}

export default CreateChatButton;
