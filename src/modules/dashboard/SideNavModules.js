import React, { Component } from 'react';

import ChatSideNav from '../chat/chatSideNav';
import BoardsSideNav from '../boards/boardsSideNav';

class SideNavModules extends Component {
  render() {
    return (
      <div style={styles.container}>
        MODULES
        <ChatSideNav />
        <BoardsSideNav />
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor:'red',
  }
}

export default SideNavModules;
