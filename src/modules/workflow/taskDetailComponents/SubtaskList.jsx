import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import EditableText from "../../../common/EditableText";
import CheckboxLottie from "common/CheckBox";

class SubtaskList extends Component {
  state = {
    hovered: null,
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
    const { subtasks, classes, subtaskUpdate } = this.props;
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
              <CheckboxLottie
                isChecked={subtask.completed}
                subtaskID={index}
                handleClick={() => this.props.handleToggleSubtask(index)}
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
  root: {},
  subtask: {
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    width: "100%",
    background: "transparent",
    borderRadius: 5,
    padding: 5,
    transition: "background-color 0.25s ease-out, color 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      background: "rgba(0,0,0,.15)  ",
    },
  },
  completedText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    textDecoration: "line-through",
    color: "#B0B2B6",
    width: "100%",
    background: "transparent",
    borderRadius: 5,
    padding: 5,
    transition: "background-color 0.25s ease-out, color 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      background: "rgba(0,0,0,.15)",
    },
  },
  textContainer: {
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    width: "100%",
    paddingLeft: 36,
  },
  subtaskContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    wordWrap: "break-word",
    width: "100%", // this shouldnt be hard coded but I couldn't figure out how to make the text not go past div.
  },
  closeIcon: {
    color: "#6d6d6d",
  },
});

export default withStyles(styles)(SubtaskList);
