import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Checkbox from "material-ui/Checkbox";

import * as Actions from "../../../actions";

import SubtaskList from "./SubtaskList";
import { TextField } from "material-ui";

class TaskDetailSubtasks extends Component {
  state = {
    subtaskContent: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCreateSubtask = () => {
    const { subtaskContent } = this.state;
    const { task } = this.props;
    const { subtasks } = task;
    task.subtasks = [
      ...subtasks,
      { content: subtaskContent, completed: false }
    ];

    this.props.actions.updateTask(task);
    this.setState({ subtaskContent: "" });
  };

  handleToggleSubtask = index => {
    const { task } = this.props;
    const { subtasks } = task;
    subtasks[index].completed = !subtasks[index].completed;
    this.props.actions.updateTask(task);
  };

  handleDelete = (removeIndex) => {
    const { task } = this.props;
    let { subtasks } = task;
    subtasks = subtasks.splice(removeIndex, 1);
    this.props.actions.updateTask(task);
  }

  updateSubtaskContent = (index, subtaskContent) => {
    const { task } = this.props;
    let { subtasks } = task;
    subtasks[index].content = subtaskContent;
    this.props.actions.updateTask(task);
  }

  render() {
    const { classes, task } = this.props;
    const { subtaskContent } = this.state;

    return (
      <div className={classes.root}>
        <Typography gutterBottom>Subtasks</Typography>
        <SubtaskList
          subtasks={task.subtasks}
          handleToggleSubtask={this.handleToggleSubtask}
          handleDelete={this.handleDelete}
          subtaskUpdate={this.updateSubtaskContent}
        />
        <div className={classes.entryWrapper}>
          <Checkbox
            checked={true}
            tabIndex={-1}
            disabled
            disableRipple={true}
            classes={{ checked: classes.decorationCheckbox }}
          />
          <TextField
            id="subtaskContent"
            placeholder="Enter a new task!"
            className={classes.textField}
            value={subtaskContent}
            onChange={this.handleChange("subtaskContent")}
            margin="none"
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateSubtask();
                ev.preventDefault();
              }
            }}
          />
        </div>
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
    marginRight: 15,
    display: "flex",
    marginTop: -8,
  },
  textField: {
    width: "100%",
  },
  decorationCheckbox: {
    marginTop: -5,
    color: "#686869",
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TaskDetailSubtasks)
);
