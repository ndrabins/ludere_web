import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Loading from "../../common/Loading";

import MessageEntry from "./MessageEntry";
import MessageList from "./MessageList";

class Chat extends Component {
  componentWillUnmount() {
    //clean up selection
    const { actions, selectedChannel } = this.props;
    actions.selectChannel(null);
    actions.unsubscribeFromMessages(selectedChannel);
  }

  render() {
    const { loadingMessages } = this.props;

    if (loadingMessages) {
      return <Loading />;
    }

    return (
      <div style={styles.container}>
        <MessageList />
        <MessageEntry />
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    loadingMessages: state.chat.loadingMessages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
