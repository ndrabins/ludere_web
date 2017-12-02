import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import CommunityMessageEntry from "./CommunityMessageEntry";
import CommunityMessageList from "./CommunityMessageList";

class Chat extends Component {
  componentWillUnmount() {
    //clean up selection
    this.props.actions.selectChannel(null);
  }

  render() {
    return (
      <div style={styles.container}>
        <CommunityMessageList />
        <CommunityMessageEntry />
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
