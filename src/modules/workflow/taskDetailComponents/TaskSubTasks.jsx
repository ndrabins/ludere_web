import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Checkbox from "material-ui/Checkbox";

import * as Actions from "../../../actions";

import SectionDivider from "../../../common/SectionDivider";
import SubtaskList from "./SubtaskList";
import Input from "material-ui/Input";
import { FormControl } from "material-ui/Form";

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
    const newTask = { ...task };
    let subtasks = newTask.subtasks;
    newTask.subtasks = [
      ...subtasks,
      { content: subtaskContent, completed: false }
    ];

    this.props.actions.updateTask(newTask);
    this.setState({ subtaskContent: "" });
  };

  handleToggleSubtask = index => {
    const { task } = this.props;
    const newTask = { ...task };
    let subtasks = newTask.subtasks;
    subtasks[index].completed = !subtasks[index].completed;
    this.props.actions.updateTask(newTask);
  };

  handleDelete = removeIndex => {
    const { task } = this.props;
    let { subtasks } = task;
    subtasks = subtasks.splice(removeIndex, 1);
    this.props.actions.updateTask(task);
  };

  updateSubtaskContent = (subtaskContent, index) => {
    const { task } = this.props;
    let { subtasks } = task;
    subtasks[index].content = subtaskContent;
    this.props.actions.updateTask(task);
  };

  render() {
    const { classes, task } = this.props;
    const { subtaskContent } = this.state;

    return (
      <div className={classes.root}>
        <SectionDivider content={"Subtasks"} />

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
          <FormControl className={classes.formControl}>
            <Input
              className={classes.input}
              classes={{ focused: classes.inputFocused }}
              value={subtaskContent}
              onChange={this.handleChange("subtaskContent")}
              multiline
              fullWidth
              rowsMax="3"
              placeholder="Enter a new task!"
              disableUnderline
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleCreateSubtask();
                  ev.preventDefault();
                }
              }}
            />
          </FormControl>
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
    display: "flex"
    // marginTop: -8
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
  },
  decorationCheckbox: {
    marginTop: -5,
    color: "#686869"
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
