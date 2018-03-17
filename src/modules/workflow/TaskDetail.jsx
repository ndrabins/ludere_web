import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import ArrowIcon from "material-ui-icons/KeyboardArrowRight";
import Button from "material-ui/Button";

import EditableText from "../../common/EditableText";
import TaskSubTasks from "./taskDetailComponents/TaskSubTasks";
import Description from "./taskDetailComponents/Description";

class TaskDetail extends Component {
  handleTitleChange = title => {
    this.props.actions.updateTaskTitle(title);
  };

  handleDelete = () => {
    this.props.actions.deleteTask();
    this.props.actions.toggleTaskDetail(null);
  }

  render() {
    const { classes, taskData, selectedTask } = this.props;

    if (taskData == null) {
      return <div />;
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
          <div className={classes.headerInner}>
            <IconButton onClick={() => this.props.actions.toggleTaskDetail()}>
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
          <Button onClick={this.handleDelete} variant="raised" className={classes.deleteButton}> Delete Task </Button>
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
    backgroundColor: "#b9bbbe",
    minHeight: 70,
    paddingTop: 10,
    paddingBottom: 10
  },
  headerInner: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10
  },
  taskContent: {
    display: "flex",
    height: "100%",
    margin: 8,
    flexDirection: 'column',
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    height: "100%"
  },
  deleteButton: {
    marginTop: 10,
    display:'flex',
    alignSelf:'center',
    color:'white',
    backgroundColor: '#C62828',
    '&:hover':{
      backgroundColor: '#B71C1C'
    }
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
