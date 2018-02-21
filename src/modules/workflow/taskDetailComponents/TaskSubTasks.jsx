import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";

import SubtaskList from "./SubtaskList";
import { TextField } from "material-ui";
const dummySubTasks = [
  { content: "Stuff", completed: false },
  { content: "Stuff1", completed: false },
  { content: "Stuff2", completed: true },
  { content: "Stuff3", completed: true },
  { content: "Stuff3", completed: true },
  { content: "Stuff3", completed: true }
];

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
    task.subtasks = [...subtasks, {content: subtaskContent, completed: false}]

    this.props.actions.updateTask(task);
    this.setState({ subtaskContent: "" });
  };

  handleToggleSubtask = (index) => {
    const { task } = this.props;
    const { subtasks } = task;
    subtasks[index].completed = !subtasks[index].completed;
    this.props.actions.updateTask(task);
  }

  render() {
    const { classes, task } = this.props;
    const { subtaskContent } = this.state;

    return (
      <div className={classes.root}>
        <Typography>Subtasks</Typography>
        <SubtaskList subtasks={task.subtasks} handleToggleSubtask={this.handleToggleSubtask} />
        <TextField
          id="subtaskContent"
          label="Subtask Name"
          placeholder="Enter a new task!"
          className={classes.textField}
          value={subtaskContent}
          onChange={this.handleChange("subtaskContent")}
          margin="normal"
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.handleCreateSubtask();
              ev.preventDefault();
            }
          }}
        />
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column"
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
