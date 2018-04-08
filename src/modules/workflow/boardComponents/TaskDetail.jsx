import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import ArrowIcon from "material-ui-icons/KeyboardArrowRight";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

import EditableText from "../../../common/EditableText";
import SectionDivider from "../../../common/SectionDivider";
import TaskSubTasks from "../taskDetailComponents/TaskSubTasks";
import Description from "../taskDetailComponents/Description";
import CommentSection from "../taskDetailComponents/CommentSection";

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

    const task = taskData[selectedTask];

    if (selectedTask === null || task === undefined || !showTaskDetail) {
      return <Paper className={classes.hiddenContainer} />;
    }
    return (
      <Paper
        elevation={16}
        className={
          this.props.showTaskDetail
            ? classes.container
            : classes.hiddenContainer
        }
      >
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.headerInner}>
              <IconButton
                className={classes.arrowIcon}
                onClick={() => this.props.actions.toggleTaskDetail()}
              >
                <ArrowIcon />
              </IconButton>
              <div className={classes.titleContainer}>
                <EditableText
                  value={task.title}
                  handleEnterPress={title => this.handleTitleChange(title)}
                />
              </div>
            </div>
          </div>
          <div className={classes.taskContent}>
            <Description task={task} />
            <TaskSubTasks task={task} />
            <CommentSection task={task} />
            <SectionDivider content={"Utility"} />
            <Button
              onClick={this.handleDelete}
              variant="raised"
              className={classes.deleteButton}
            >
              Delete Task
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = theme => ({
  hiddenContainer: {
    marginTop: 6,
    height: `calc(100% - 84px)`,
    width: 0,
    position: "absolute",
    backgroundColor: "#E3E3E4",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    right: 0,
    transition: "opacity 0.7s ease-out, width 1s ease-out",
    opacity: 0
  },
  container: {
    marginTop: 6,
    height: `calc(100% - 84px)`,
    width: 400,
    position: "absolute",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    right: 0,
    transition: "opacity 1s ease-out, width .7s ease-out",
    opacity: 1
  },
  innerContainer: {
    minWidth: 400,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    borderTopLeftRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "linear-gradient(to right, #29b6f6, #53C6F7)",
    minHeight: 40
  },
  headerInner: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    marginTop: "-2px",
    marginBottom: "-3px"
  },
  taskContent: {
    height: "100%",
    padding: 8,
    overflowY: "auto"
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    height: "100%"
  },
  deleteButton: {
    marginTop: 10,
    display: "flex",
    alignSelf: "center",
    color: "white",
    backgroundColor: "#b9bbbe",
    "&:hover": {
      backgroundColor: "#e74c3c"
    }
  },
  arrowIcon: {
    color: "white",
    marginTop: -2,
    marginBottom: -2
  }
});

function mapStateToProps(state) {
  return {
    showTaskDetail: state.workflow.showTaskDetail,
    taskData: state.workflow.taskData,
    selectedTask: state.workflow.selectedTask,
    showTaskDetail: state.workflow.showTaskDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TaskDetail)
);
