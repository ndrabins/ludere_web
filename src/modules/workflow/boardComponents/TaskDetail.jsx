import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import EditableText from "common/EditableText";
import SectionDivider from "common/SectionDivider";
import TaskSubTasks from "../taskDetailComponents/TaskSubTasks";
import Description from "../taskDetailComponents/Description";
import CommentSection from "../taskDetailComponents/CommentSection";
import CloseIcon from "@material-ui/icons/Close";

class TaskDetail extends Component {
  handleTitleChange = title => {
    this.props.actions.updateTaskTitle(title);
  };

  handleDelete = () => {
    this.props.actions.deleteTask();
    this.props.actions.toggleTaskDetail(null);
  };

  render() {
    const { classes, taskData, selectedTask, showTaskDetail } = this.props;

    if (selectedTask === null || !showTaskDetail) {
      return <Paper className={classes.hiddenContainer} />;
    }

    const task = taskData[selectedTask];

    return (
      <Paper
        elevation={16}
        className={showTaskDetail ? classes.container : classes.hiddenContainer}
      >
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.headerInner}>
              <IconButton
                className={classes.icon}
                onClick={() => this.props.actions.toggleTaskDetail()}
              >
                <CloseIcon />
              </IconButton>
              <div className={classes.titleContainer}>
                <EditableText
                  value={task.title}
                  handleEnterPress={title => this.handleTitleChange(title)}
                />
              </div>
            </div>
          </div>
          {showTaskDetail && (
            <div className={classes.taskContent}>
              <Description task={task} />
              <TaskSubTasks task={task} />
              <SectionDivider content={"Comments"} />
              <CommentSection taskID={selectedTask} />
              <SectionDivider content={"Utility"} />
              <Button
                onClick={this.handleDelete}
                variant="contained"
                className={classes.deleteButton}
              >
                Delete Task
              </Button>
            </div>
          )}
        </div>
      </Paper>
    );
  }
}

const styles = theme => ({
  hiddenContainer: {
    marginTop: 6,
    width: "40%",
    height: `calc(100% - 130px)`,
    position: "absolute",
    backgroundColor: "#E3E3E4",
    borderRadius: 10,
    right: 25,
    transition: "opacity 0.5s ease-out",
    zIndex: -10,
    opacity: 0,
  },
  container: {
    marginTop: 6,
    height: `calc(100% - 130px)`,
    minWidth: 300,
    width: "40%",
    position: "absolute",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    right: 25,
    transition: "opacity .5s ease-out",
    opacity: 1,
  },
  innerContainer: {
    minWidth: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "#6b6b6b",
    minHeight: 40,
  },
  headerInner: {
    display: "flex",
    width: "100%",
    // height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    marginTop: "-2px",
    marginBottom: "-3px",
  },
  taskContent: {
    // height: "100%",
    padding: 8,
    overflowY: "auto",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
  },
  deleteButton: {
    marginTop: 10,
    display: "flex",
    alignSelf: "center",
    color: "white",
    backgroundColor: "#b9bbbe",
    "&:hover": {
      backgroundColor: "#e74c3c",
    },
  },
  icon: {
    color: "white",
    marginTop: -2,
    marginBottom: -2,
  },
});

function mapStateToProps(state) {
  return {
    showTaskDetail: state.workflow.showTaskDetail,
    taskData: state.workflow.taskData,
    selectedTask: state.workflow.selectedTask,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TaskDetail));
