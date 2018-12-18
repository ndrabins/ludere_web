import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FroalaTextEditor from "common/FroalaTextEditor";

class Description extends Component {
  updateDescription = description => {
    let updatedTask = { ...this.props.task };
    updatedTask.description = description;
    this.props.actions.updateTask(updatedTask);
  };

  render() {
    const { classes, task, taskID } = this.props;
    return (
      <div className={classes.root}>
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
