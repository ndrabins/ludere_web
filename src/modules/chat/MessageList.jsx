import ForInRight from "lodash/forInRight";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import * as Actions from "../../actions";
import Loading from "../../common/Loading";
import MessageComponent from "./Message";
import MessagesIcon from "static/undraw_noMessages.svg";
import dayjs from "dayjs";

const INITIAL_MESSAGE_FETCH = 25;

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageList = React.createRef();
    this.messagesEnd = React.createRef();

    this.state = {
      numberOfMessages: 25,
      oldScrollPosition: 0,
    };
  }

  componentDidMount() {
    this.messageList.current.addEventListener("scroll", this.handleScroll);
    this.messageList.current.scrollTop = 10000;
  }

  componentDidUpdate(prevProps) {
    const { oldScrollPosition } = this.state;
    const { stopScroll } = this.props;

    if (stopScroll) {
      return;
    }

    let containerHeight = this.messageList.current.scrollHeight;
    let innerContainerHeight = this.messageList.current.clientHeight;
    let scrollbarLocation = this.messageList.current.scrollTop;

    let scrollPositionBottom =
      containerHeight - (scrollbarLocation + innerContainerHeight);

    if (scrollPositionBottom < 200) {
      this.scrollToBottom();
      return;
    }

    if (
      Object.keys(prevProps.messages).length === 0 &&
      Object.keys(this.props.messages).length > 0
    ) {
      this.messageList.current.scrollTop = 10000; //this is here to set the scroll bar to the bottom of page on load
      return;
    }

    if (scrollbarLocation === 0) {
      this.messageList.current.scrollTop = containerHeight - oldScrollPosition;
      return;
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  handleScroll = () => {
    const { messages } = this.props;
    //return early on the case where window tries to scroll before ref set
    if (this.messageList.current === null) {
      return;
    }

    // don't try to fetch more messages if thre aren't atleast INITIAL_MESSAGE_FETCH.
    // This is to prevent to many loads and ratcheting of scroll
    if (Object.keys(messages).length < INITIAL_MESSAGE_FETCH) {
      return;
    }

    let containerHeight = this.messageList.current.scrollHeight;

    if (this.messageList.current.scrollTop === 0) {
      //on fetch more, save old scroll position
      this.setState({
        oldScrollPosition: containerHeight,
      });
      this.handleFetchMore();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  renderMessages() {
    const { userID, channelID, workspaceMembers } = this.props;
    let lastUser = null;
    let previousTimeStamp = null;
    let enoughTimeHasPassed = false;
    let timestamp = "";

    let messages = [];

    ForInRight(this.props.messages, (message, key) => {
      if (message.dateCreated !== null) {
        timestamp = dayjs
          .unix(message.dateCreated.seconds)
          .format("h:mm A MM/DD");

        if (previousTimeStamp !== null) {
          let recentDiff = message.dateCreated.seconds - previousTimeStamp;
          if (recentDiff < 180) {
            enoughTimeHasPassed = true;
          } else {
            enoughTimeHasPassed = false;
          }
        }

        previousTimeStamp = message.dateCreated.seconds;
      } else {
        timestamp = "";
      }

      if (message.type === "file") {
        messages.push(
          <MessageComponent
            message={message}
            messageID={key}
            type="file"
            formattedTimeStamp={timestamp}
            key={key}
            userID={userID}
            channelID={channelID}
            userName={workspaceMembers[message.sentBy].displayName}
            avatarURL={workspaceMembers[message.sentBy].photoURL}
          />
        );
      }
      // render only text if last message is by the same user AND within 3 minutes
      else if (lastUser === message.sentBy && enoughTimeHasPassed) {
        messages.push(
          <MessageComponent
            message={message}
            messageID={key}
            type="small"
            formattedTimeStamp={timestamp}
            key={key}
            userID={userID}
            channelID={channelID}
            userName={workspaceMembers[message.sentBy].displayName}
            avatarURL={workspaceMembers[message.sentBy].photoURL}
          />
        );
      } else {
        messages.push(
          <MessageComponent
            message={message}
            messageID={key}
            type="normal"
            formattedTimeStamp={timestamp}
            key={key}
            userID={userID}
            channelID={channelID}
            userName={workspaceMembers[message.sentBy].displayName}
            avatarURL={workspaceMembers[message.sentBy].photoURL}
          />
        );
      }

      lastUser = message.sentBy;
    });

    return messages;
  }

  handleFetchMore = () => {
    const { numberOfMessages } = this.state;
    this.props.actions.getMoreMessages(numberOfMessages);

    this.setState({ numberOfMessages: numberOfMessages + 25 });
  };

  render() {
    const { loadingMoreMessages, classes, messages } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.messages} ref={this.messageList}>
          {loadingMoreMessages && (
            <div className={classes.loadingContainer}>
              <Loading />
            </div>
          )}
          {Object.keys(messages).length === 0 ? (
            <div className={classes.emptyMessages}>
              <img
                className={classes.icon}
                src={MessagesIcon}
                alt="list icon"
              />
            </div>
          ) : (
            this.renderMessages()
          )}
          <div
            style={{ float: "left", clear: "both", height: 20 }}
            ref={this.messagesEnd}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  messages: {
    height: "100%",
    overflow: "auto",
  },
  loadingContainer: {
    height: 100,
  },
  uploadedImage: {
    maxWidth: 400,
    maxHeight: 400,
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200,
  },
  emptyMessages: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

function mapStateToProps(state) {
  return {
    workspaceMembers: state.workspace.workspaceUsers,
    loadingMoreMessages: state.chat.loadingMoreMessages,
    userID: state.auth.user.uid,
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
)(withStyles(styles)(MessageList));
