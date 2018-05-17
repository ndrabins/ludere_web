import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/transitions/Fade";
import EditableText from "../../../common/EditableText";

class SubtaskList extends Component {
  state = {
    hovered: null
  };

  handleDeleteClick = (event, index) => {
    event.stopPropagation();
    this.props.handleDelete(index);
  };

  handleHover = index => {
    this.setState({ hovered: index });
  };

  handleLeave = () => {
    this.setState({ hovered: null });
  };

  render() {
    const { subtasks, classes, handleDelete, subtaskUpdate } = this.props;
    const { hovered } = this.state;

    return (
      <div className={classes.root}>
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            className={classes.subtask}
            onMouseOver={() => this.handleHover(index)}
            onMouseLeave={() => this.handleLeave()}
          >
            <div className={classes.subtaskContent}>
              <Checkbox
                onClick={() => this.props.handleToggleSubtask(index)}
                classes={{
                  root: classes.root,
                  checked: classes.checked
                }}
                checked={subtask.completed}
                tabIndex={-1}
                disableRipple={false}
              />
              <div className={classes.textContainer}>
                <EditableText
                  value={subtask.content}
                  handleEnterPress={content => subtaskUpdate(content, index)}
                  textStyle={
                    subtask.completed ? classes.completedText : classes.text
                  }
                />
              </div>
            </div>
            <Fade in={index === hovered} timeout={{ enter: 250, exit: 100 }}>
              <IconButton
                onClick={event => this.handleDeleteClick(event, index)}
              >
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </Fade>
          </div>
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    overflowY: "auto"
  },
  subtask: {
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "-8px",
    width: "100%"
  },
  text: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    transition: "color 0.5s ease-out",
    paddingTop: 5,
    width: "100%"
  },
  completedText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    textDecoration: "line-through",
    color: "#B0B2B6",
    transition: "color 0.25s ease-out",
    paddingTop: 5,
    width: "100%"
  },
  textContainer: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    paddingTop: 10,
    width: "100%"
  },
  subtaskContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    wordWrap: "break-word",
    width: 273 // this shouldnt be hard coded but I couldn't figure out how to make the text no go past div.
  },
  closeIcon: {
    color: "#6d6d6d"
  },
  root: {
    "&$checked": {
      color: "#36B6F5"
    }
  },
  checked: {}
});

export default withStyles(styles)(SubtaskList);
