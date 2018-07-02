import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import QuillEditor from "common/QuillEditor";

class Description extends Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBlur = quillContent => {
    let updatedTask = this.props.task;
    updatedTask.description = { ...quillContent };

    this.props.actions.updateTask(updatedTask);
  };

  render() {
    const { classes, task } = this.props;
    return (
      <div className={classes.root}>
        <QuillEditor
          helperText="A description about this task"
          handleBlur={this.handleBlur}
          value={task.description}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    overflowY: "auto",
    marginBottom: 5,
    background: "white"
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
    width: "100%"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Description));
