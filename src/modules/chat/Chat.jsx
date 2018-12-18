import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../common/Loading";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "static/undraw_messaging.svg";
import Fade from "@material-ui/core/Fade";

import MessageEntry from "./MessageEntry";
import MessageList from "./MessageList";
import TypingIndicator from "./TypingIndicator";
import ModuleHeader from "common/ModuleHeader";
import Message from "@material-ui/icons/Message";

class Chat extends Component {
  componentWillUnmount() {
    //clean up selection
    const { actions, selectedChannelID } = this.props;
    actions.selectChannel(null);
    actions.unsubscribeFromMessages(selectedChannelID);
  }

  render() {
    const {
      loadingMessages,
      selectedChannelID,
      channels,
      user,
      messages,
      classes,
    } = this.props;

    if (selectedChannelID === null || selectedChannelID === undefined) {
      return (
        <div className={classes.unselectedBoardContainer}>
          <Typography variant="h4">Start by selecting a channel!</Typography>
          <img className={classes.icon} src={ChatIcon} alt="list icon" />
        </div>
      );
    }

    if (loadingMessages) {
      return <Loading />;
    }

    const selectedChannel = channels[selectedChannelID];

    return (
      <Fade in={true} timeout={{ enter: 800, exit: 800 }}>
        <div className={classes.container}>
          <ModuleHeader>
            <Typography variant="h5" className={classes.header}>
              <Message className={classes.headerIcon} />
              {selectedChannel.name}
            </Typography>
          </ModuleHeader>
          <MessageList
            messages={messages}
            channelID={selectedChannelID}
            stopScroll={false}
          />
          <MessageEntry
            channelID={selectedChannelID}
            helperText={`Message #${selectedChannel.name} here`}
            small={false}
            autoFocus={true}
          />
          <TypingIndicator
            usersTyping={selectedChannel.usersTyping}
            userID={user.uid}
          />
        </div>
      </Fade>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200,
  },
  unselectedBoardContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  headerIcon: {
    marginRight: 8,
    color: "#303030",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
};

function mapStateToProps(state) {
  return {
    selectedChannelID: state.chat.selectedChannel,
    loadingMessages: state.chat.loadingMessages,
    messages: state.chat.messages,
    channels: state.chat.channels,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
