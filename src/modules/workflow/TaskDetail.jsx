import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import ArrowIcon from "material-ui-icons/KeyboardArrowRight";
import Typography from "material-ui/Typography";

import EditableText from "../../common/EditableText";
import TaskSubTasks from "./taskDetailComponents/TaskSubTasks";

class TaskDetail extends Component {
  handleTitleChange = title => {
    this.props.actions.updateTaskTitle(title);
  };
  render() {
    const { classes, showTaskDetail, taskData, selectedTask } = this.props;

    if(taskData == null){
      return;
    }

    const task = taskData[selectedTask];

    if (selectedTask === null || task === undefined) {
      return <div className={classes.hiddenContainer} />;
    }
    return (
      <div
        className={
          this.props.showTaskDetail
            ? classes.container
            : classes.hiddenContainer
        }
      >
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <IconButton onClick={() => this.props.actions.toggleTaskDetail()}>
              <ArrowIcon />
            </IconButton>
            <EditableText
              value={task.title}
              handleEnterPress={title => this.handleTitleChange(title)}
            />
          </div>
        </div>
        <div className={classes.taskContent}>
          <TaskSubTasks task={task} />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  hiddenContainer: {
    height: `calc(100% - 84px)`,
    width: 400,
    position: "absolute",
    backgroundColor: "#E3E3E4",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    right: -400,
    transition: "opacity 0.5s ease-out, right 0.5s ease-out",
    opacity: 0,
    boxShadow: "0px 7px 14px 2px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column"
  },
  container: {
    height: `calc(100% - 84px)`,
    width: 400,
    position: "absolute",
    backgroundColor: "#E3E3E4",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    right: 0,
    transition: "opacity 0.5s ease-out, right 0.5s ease-out",
    opacity: 1,
    boxShadow: "0px 7px 14px 2px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    borderTopLeftRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#b9bbbe"
  },
  headerLeft: {
    display: "flex",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    whiteSpace: "pre-line",
    wordWrap: "break-word"
  },
  taskContent: {
    display: "flex",
    height: "100%",
    margin: 8
  }
});

function mapStateToProps(state) {
  return {
    showTaskDetail: state.workflow.showTaskDetail,
    taskData: state.workflow.taskData,
    selectedTask: state.workflow.selectedTask
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
