import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import CloseIcon from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";

import EditableText from '../../../common/EditableText';

class SubtaskList extends Component {
  handleDeleteClick = (event, index) => {
    event.stopPropagation();
    this.props.handleDelete(index);
  }

  handleUpdateSubtaskContent = (index) => {
    // event.stopPropagation();
    const { subtaskUpdate } = this.props;
    console.log('updating');
    console.log('index')
  }

  render() {
    const { subtasks, classes, handleDelete } = this.props;

    return (
      <div className={classes.root}>
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            onClick={() => this.props.handleToggleSubtask(index)}
            className={classes.subtask}
          >
            <div className={classes.subtaskContent}>
              <Checkbox
                checked={subtask.completed}
                tabIndex={-1}
                disableRipple={false}
              />
              <Typography
                className={
                  subtask.completed ? classes.completedText : classes.text
                }
              >
                {subtask.content}
              </Typography>
              {/* <EditableText
                value={subtask.content}
                handleEnterPress={ ()  => this.handleUpdateSubtaskContent(index)}
              /> */}
            </div>
            <IconButton onClick={(event) => this.handleDeleteClick(event, index)}>
              <CloseIcon />
            </IconButton>
          </div>
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    overflowY: "auto",
    paddingTop: 8,
  },
  subtask: {
    marginTop: -14,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
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
  subtaskContent:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});

export default withStyles(styles)(SubtaskList);
