import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import CloseIcon from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";
import Map from "lodash/map";
import Message from "../../../common/Message";

class CommentList extends Component {
  handleDeleteClick = (event, index) => {
    event.stopPropagation();
    this.props.handleDelete(index);
  };

  render() {
    const { comments, classes, handleDelete } = this.props;

    return (
      <div className={classes.root}>
        {Map(comments, (comment, key) => {
          return (
            <div key={key}>
              <Message
                text={comment.content}
                timestamp={comment.DateCreated}
                sentBy={comment.sentBy}
                displayName={comment.sentByDisplayName}
                photoURL={comment.photoURL}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    overflowY: "auto",
    marginBottom: 10
  },
  text: {
    display: "flex",
    wordWrap: "break-all",
    overflowWrap: "break-word",
    transition: "color 0.5s ease-out"
  },
  completedText: {
    display: "flex",
    wordWrap: "break-all",
    overflowWrap: "break-word",
    textDecoration: "line-through",
    color: "#B0B2B6",
    transition: "color 0.25s ease-out"
  },
  commentContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default withStyles(styles)(CommentList);
