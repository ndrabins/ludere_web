import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Actions from "../../../actions";

import MessageList from "modules/chat/MessageList";
import TypingIndicator from "modules/chat/TypingIndicator";
import MessageEntry from "modules/chat/MessageEntry";

class CommentSection extends Component {
  countComments = () => {
    const { comments, actions } = this.props;

    const numberOfComments = Object.keys(comments).length;
    const updatedTask = { numberOfComments: numberOfComments + 1 };

    actions.updateTask(updatedTask);
  };

  render() {
    const { classes, comments, taskID, userID, commentChannel } = this.props;

    return (
      <div className={classes.root}>
        <MessageList messages={comments} channelID={taskID} stopScroll={true} />
        <MessageEntry
          channelID={taskID}
          helperText="Comment here"
          small={true}
          autoFocus={false}
          actionOnSendMessage={this.countComments}
        />
        {!!commentChannel && (
          <TypingIndicator
            usersTyping={commentChannel.usersTyping}
            userID={userID}
          />
        )}
        {/* </div> */}
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    margin: -8
  },
  entryWrapper: {
    display: "flex",
    marginTop: -8
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    border: "transparent 2px solid",
    transition: "border .25s ease-out",
    "&:hover": {
      border: "#B0B2B6 2px solid"
    }
  },
  inputFocused: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    transition: "border .25s ease-out",
    border: "2px solid #6d6d6d",
    "&:hover": {
      border: "2px solid #6d6d6d"
    }
  },
  formControl: {
    width: "100%",
    marginTop: 3
  }
};

function mapStateToProps(state) {
  return {
    comments: state.workflow.comments,
    userID: state.auth.user.uid,
    commentChannel: state.workflow.commentChannel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentSection));
