import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import QuillEditor from "common/QuillEditor";
import FroalaTextEditor from "common/FroalaTextEditor";

class Description extends Component {
  // updateQuill = quillContent => {
  //   let updatedTask = this.props.task;
  //   updatedTask.description = { ...quillContent };

  //   this.props.actions.updateTask(updatedTask);
  // };

  updateDescription = description => {
    let updatedTask = { ...this.props.task };
    updatedTask.description = description;
    this.props.actions.updateTask(updatedTask);
  };

  render() {
    const { classes, task, taskID } = this.props;
    return (
      <div className={classes.root}>
        {/* <QuillEditor
          helperText="A description about this task"
          handleBlur={this.updateQuill}
          value={task.description}
          onChange={this.updateQuill}
        /> */}
        <FroalaTextEditor
          value={task.description}
          taskID={taskID}
          onChange={this.updateDescription}
          helperText="A description about this task"
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    overflowY: "auto",
    marginBottom: 4,
    background: "white",
    padding: 8,
    borderRadius: 8,
  },
  // input: {
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   padding: 5,
  //   color: "black",
  //   overflowY: "auto",
  //   overflowX: "hidden",
  //   cursor: "text",
  //   border: "transparent 2px solid",
  //   transition: "border .25s ease-out",
  //   "&:hover": {
  //     border: "#B0B2B6 2px solid",
  //   },
  // },
  // inputFocused: {
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   padding: 5,
  //   color: "black",
  //   overflowY: "auto",
  //   overflowX: "hidden",
  //   cursor: "text",
  //   transition: "border .25s ease-out",
  //   border: "2px solid #6d6d6d",
  //   "&:hover": {
  //     border: "2px solid #6d6d6d",
  //   },
  // },
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Description));
