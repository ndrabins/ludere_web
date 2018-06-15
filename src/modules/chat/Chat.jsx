import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Loading from "../../common/Loading";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "../../static/chat.svg";

import MessageEntry from "./MessageEntry";
import MessageList from "./MessageList";
import TypingIndicator from "./TypingIndicator";

class Chat extends Component {
  componentWillUnmount() {
    //clean up selection
    const { actions, selectedChannel } = this.props;
    actions.selectChannel(null);
    actions.unsubscribeFromMessages(selectedChannel);
  }

  render() {
    const { loadingMessages, selectedChannelID, channels, user } = this.props;
    if (selectedChannelID === null || selectedChannelID === undefined) {
      return (
        <div style={styles.unselectedBoardContainer}>
          <Typography variant="display2">
            Start by selecting a channel!
          </Typography>
          <img style={styles.icon} src={ChatIcon} alt="list icon" />
        </div>
      );
    }

    if (loadingMessages) {
      return <Loading />;
    }

    const selectedChannel = channels[selectedChannelID];

    return (
      <div style={styles.container}>
        <MessageList />
        <MessageEntry channel={selectedChannel} />
        <TypingIndicator
          usersTyping={selectedChannel.usersTyping}
          userID={user.uid}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200
  },
  unselectedBoardContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

function mapStateToProps(state) {
  return {
    selectedChannelID: state.chat.selectedChannel,
    loadingMessages: state.chat.loadingMessages,
    channels: state.chat.channels,
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
