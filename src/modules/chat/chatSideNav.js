import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import AddIcon from "material-ui-icons/Add";
import Message from 'material-ui-icons/Message';

import ChannelList from './ChannelList';
class ChatSideNav extends Component {
  render() {
    return (
      <div>
        <div style={styles.title}>
          <div style={{display:'flex', alignContent:'center', justifyContent:'center'}}>
            <Message />
            <div style={{marginLeft: 14}}>
              Chat
            </div>
          </div>
          <IconButton style={{width:26, height:26, color: "white", background: 'linear-gradient(to right, #e57373, #ee8d68)'}}>
            <AddIcon />
          </IconButton>
        </div>
        <div>
          <ChannelList />
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    display:'flex',
    color:'white',
    justifyContent: 'space-between',
    alignItems:'center',
    height: 40,
    margin: '0px 10px 0 32px',
  }
}

export default ChatSideNav;
