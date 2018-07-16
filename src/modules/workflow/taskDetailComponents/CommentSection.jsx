import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Actions from "../../../actions";

import SectionDivider from "../../../common/SectionDivider";
import MessageList from "modules/chat/MessageList";
import TypingIndicator from "modules/chat/TypingIndicator";
import MessageEntry from "modules/chat/MessageEntry";

class CommentSection extends Component {
  state = {
    commentText: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCreateComment = () => {
    const { comments, actions } = this.props;
    const { commentText } = this.state;

    const numberOfComments = Object.keys(comments).length;

    if (commentText === "") {
      return;
    }

    actions.createComment(commentText, numberOfComments);
    this.setState({ commentText: "" });
  };

  // handleDelete = removeIndex => {
  //   const { task } = this.props;
  //   let { subtasks } = task;
  //   subtasks = subtasks.splice(removeIndex, 1);
  //   this.props.actions.updateTask(task);
  // };

  // updatecommentText = (index, commentText) => {
  //   const { task } = this.props;
  //   let { subtasks } = task;
  //   subtasks[index].content = commentText;
  //   this.props.actions.updateTask(task);
  // };

  render() {
    const { classes, comments, taskID, userID, commentChannel } = this.props;

    return (
      <div className={classes.root}>
        <SectionDivider content={"Comments"} />
        <MessageList messages={comments} channelID={taskID} stopScroll={true} />
        <MessageEntry channelID={taskID} helperText="Comment here" />
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
    flexDirection: "column"
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
