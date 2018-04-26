import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import moment from "moment";
import ForInRight from "lodash/forInRight";

import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import FolderIcon from "material-ui-icons/Folder";
class MessageList extends Component {
  state = {
    numberOfMessages: 25
  };

  renderMessages() {
    let lastUser = null;
    let previousTimeStamp = null;
    let enoughTimeHasPassed = false;

    let messages = [];

    ForInRight(this.props.messages, (message, key) => {
      let diff = moment(message.dateCreated).diff(moment(), "minutes");
      let timestamp = moment()
        .add(diff, "minutes")
        .calendar();

      //check to see if 3 minutes have passed to change render
      // if (previousTimeStamp !== null) {
      //   let recentDiff = moment(message.dateCreated).diff(
      //     previousTimeStamp,
      //     "seconds"
      //   );
      //   if (recentDiff < 180) {
      //     enoughTimeHasPassed = true;
      //   } else {
      //     enoughTimeHasPassed = false;
      //   }
      // }

      // lastUser = message.sentBy;
      // previousTimeStamp = message.dateCreated;

      //render only text if last message is by the same user AND within 3 minutes
      // if(lastUser === message.sentBy && enoughTimeHasPassed){
      //   return (
      //   <div style={styles.messageContainer} key={key}>
      //     <div style={styles.messageBlockContent}>
      //       <p style={styles.messageText}>{message.messageText}</p>
      //     </div>
      //   </div>
      //   );
      // }

      //normal message with avatar
      messages.push(
        <div style={styles.messageContainer} key={key}>
          <Avatar
            src={message.avatarURL}
            style={{ margin: "10px 10px 0px 10px" }}
          />
          <div style={styles.messageContent}>
            <div style={styles.messageHeader}>
              <div style={styles.name}> {message.sentByDisplayName} </div>
              <div style={styles.date}> {timestamp} </div>
            </div>
            <p style={styles.messageText}>{message.messageText}</p>
          </div>
        </div>
      );
    });
    return messages;
  }

  handleFetchMore = () => {
    const { numberOfMessages } = this.state;
    this.props.actions.getMoreMessages(numberOfMessages);

    this.setState({ numberOfMessages: numberOfMessages + 25 });
  };

  render() {
    return (
      <div style={styles.container}>
        <Button onClick={this.handleFetchMore}>Fetch more messages</Button>
        <div style={styles.messages}>{this.renderMessages()}</div>
      </div>
    );
  }
}

const styles = {
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
    display: "flex"
  },
  messageContent: {
    maxWidth: "90%",
    marginTop: 10,
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
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
