import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";

class SubtaskList extends Component {
  render() {
    const { subtasks, classes } = this.props;
    return (
      <div className={classes.root}>
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            onClick={() => this.props.handleToggleSubtask(index)}
            className={classes.subtask}
          >
            <Checkbox checked={subtask.completed} tabIndex={-1} disableRipple={true} />
            <Typography className={subtask.completed ? classes.completedText : classes.text}>{subtask.content}</Typography>
          </div>
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    maxHeight: '40%',
    overflowY: 'auto',
  },
  subtask: {
    padding: 0,
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    display: "flex",
    wordWrap: "break-all",
    overflowWrap: "break-word",
    wordBreak: "break-all",
    transition: "color 0.5s ease-out"
  },
  completedText: {
    display: "flex",
    wordWrap: "break-all",
    overflowWrap: "break-word",
    wordBreak: "break-all",
    textDecoration: "line-through",
    color: '#B0B2B6',
    transition: "color 0.25s ease-out"
  }
});

export default withStyles(styles)(SubtaskList);
