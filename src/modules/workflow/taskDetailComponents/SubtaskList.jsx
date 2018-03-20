import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import CloseIcon from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";
import Fade from "material-ui/transitions/Fade";

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
    const { subtasks, classes, handleDelete } = this.props;
    const { hovered } = this.state;

    return (
      <div className={classes.root}>
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            onClick={() => this.props.handleToggleSubtask(index)}
            className={classes.subtask}
            onMouseOver={() => this.handleHover(index)}
            onMouseLeave={() => this.handleLeave()}
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
            </div>
            <Fade in={index === hovered} timeout={{enter: 250, exit: 100}}>
              <IconButton
                onClick={event => this.handleDeleteClick(event, index)}
              >
                <CloseIcon className={classes.closeIcon}/>
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
    overflowY: "auto",
  },
  subtask: {
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: '-8px',
  },
  text: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    overflowWrap: "break-all",
    transition: "color 0.5s ease-out",
    paddingTop: 13,
    maxWidth: '100%',
  },
  completedText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    overflowWrap: "break-all",
    textDecoration: "line-through",
    color: "#B0B2B6",
    transition: "color 0.25s ease-out",
    paddingTop: 13,
  },
  subtaskContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  closeIcon: {
    color: '#6d6d6d',
  }
});

export default withStyles(styles)(SubtaskList);
