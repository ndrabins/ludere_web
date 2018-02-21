import React, { Component } from 'react';

import Message from 'material-ui-icons/Message';

import CreateChannelButton from './CreateChannelButton';
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
         <CreateChannelButton />
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
