import React, { Component } from 'react';

import ChatSideNav from '../chat/ChatSideNav';
import BoardsSideNav from '../boards/boardsSideNav';

class SideNavModules extends Component {
  render() {
    return (
      <div style={styles.container}>
        <ChatSideNav />
        {/* <BoardsSideNav /> */}
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: 10,
  }
}

export default SideNavModules;
