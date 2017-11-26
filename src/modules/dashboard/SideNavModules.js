import React, { Component } from 'react';

import ChatSideNav from '../chat/ChatSideNav';
import BoardsSideNav from '../boards/boardsSideNav';
import CommunitySideNav from '../community/CommunitySideNav';

import {Route} from 'react-router-dom';

class SideNavModules extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Route path="/community" component={CommunitySideNav} />
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
