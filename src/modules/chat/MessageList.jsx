import ForInRight from "lodash/forInRight";
import Avatar from "material-ui/Avatar";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "material-ui/styles";
import * as Actions from "../../actions";
import Loading from "../../common/Loading";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageList = React.createRef();
    this.messagesEnd = React.createRef();

    this.state = {
      numberOfMessages: 25,
      oldScrollPosition: 0
    };
  }

  componentDidMount() {
    this.messageList.current.addEventListener("scroll", this.handleScroll);
    this.messageList.current.scrollTop = 10000;
  }

  componentDidUpdate(prevProps) {
    const { oldScrollPosition } = this.state;

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
    //return early on the case where window tries to scroll before ref set
    if (this.messageList.current === null) {
      return;
    }

    let containerHeight = this.messageList.current.scrollHeight;

    if (this.messageList.current.scrollTop === 0) {
      //on fetch more, save old scroll position
      this.setState({
        oldScrollPosition: containerHeight
      });
      this.handleFetchMore();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  renderMessages() {
    const { classes } = this.props;
    let lastUser = null;
    let previousTimeStamp = null;
    let enoughTimeHasPassed = false;

    let messages = [];

    ForInRight(this.props.messages, (message, key) => {
      let diff = moment(message.dateCreated).diff(moment(), "minutes");
      let timestamp = moment()
        .add(diff, "minutes")
        .calendar();

      // check to see if 3 minutes have passed to change render
      if (previousTimeStamp !== null) {
        let recentDiff = moment(message.dateCreated).diff(
          previousTimeStamp,
          "seconds"
        );
        if (recentDiff < 180) {
          enoughTimeHasPassed = true;
        } else {
          enoughTimeHasPassed = false;
        }
      }

      lastUser = message.sentBy;
      previousTimeStamp = message.dateCreated;

      // render only text if last message is by the same user AND within 3 minutes
      if (lastUser === message.sentBy && enoughTimeHasPassed) {
        messages.push(
          <div className={classes.messageContainer} key={key}>
            <div className={classes.messageBlockContent}>
              <p className={classes.messageText}>{message.messageText}</p>
            </div>
          </div>
        );
      } else {
        messages.push(
          <div className={classes.messageContainer} key={key}>
            <Avatar src={message.avatarURL} style={{ margin: "0px 10px" }} />
            <div className={classes.messageContent}>
              <div className={classes.messageHeader}>
                <div className={classes.name}>{message.sentByDisplayName}</div>
                <div className={classes.date}> {timestamp} </div>
              </div>
              <p className={classes.messageText}>{message.messageText}</p>
            </div>
          </div>
        );
      }
    });

    return messages;
  }

  handleFetchMore = () => {
    const { numberOfMessages } = this.state;
    this.props.actions.getMoreMessages(numberOfMessages);

    this.setState({ numberOfMessages: numberOfMessages + 25 });
  };

  render() {
    const { loadingMoreMessages, classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.messages} ref={this.messageList}>
          {loadingMoreMessages && (
            <div className={classes.loadingContainer}>
              <Loading />
            </div>
          )}
          {this.renderMessages()}
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
    flexDirection: "column"
  },
  messages: {
    height: "100%",
    overflow: "auto"
  },
  messageContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    display: "flex",
    backgroundColor: "transparent",
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "#C3C3C3"
    }
  },
  messageContent: {
    maxWidth: "90%",
    marginRight: 30,
    display: "flex",
    flexDirection: "column"
  },
  messageBlockContent: {
    width: "90%",
    marginLeft: 60,
    display: "flex",
    flexDirection: "column"
  },
  messageHeader: {
    display: "flex",
    flexDirection: "row"
  },
  messageText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    marginBottom: "3px",
    marginTop: "0px",
    fontSize: "15px"
  },
  name: {
    fontSize: 16,
    fontWeight: 500
  },
  date: {
    fontSize: 12,
    alignItems: "center",
    display: "flex",
    marginLeft: 3,
    color: "#b9bbbe"
  },
  loadingContainer: {
    height: 100
  }
});

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    messages: state.chat.messages,
    loadingMoreMessages: state.chat.loadingMoreMessages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MessageList)
);
