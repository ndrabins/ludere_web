import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ArrowIcon from 'material-ui-icons/KeyboardArrowRight';


class TaskDetail extends Component {
  render() {
    const {classes, showTaskDetail, taskData, selectedTask} = this.props;

    if(selectedTask === null){
      return <div className={classes.hiddenContainer} />;
    }

    const task = taskData[selectedTask];
    
    
    return (
      <div className={this.props.showTaskDetail ? classes.container : classes.hiddenContainer}>
        <IconButton onClick={() => this.props.actions.toggleTaskDetail()}>
          <ArrowIcon />
        </IconButton>
        {task.title}
      </div>
    );
  }
}

const styles = theme => ({
  hiddenContainer: {
    height: `calc(100% - 84px)`,
    width: 400,
    position: 'absolute',
    backgroundColor:"#E3E3E4",
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 10, 
    right: -400,
    transition: "opacity 0.5s ease, right 0.5s ease",
    opacity: 0,
  },
  container: {
    height: `calc(100% - 84px)`,
    width: 400,
    position: 'absolute',
    backgroundColor:"#E3E3E4",
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 10, 
    right: 0,
    transition: "opacity 0.5s ease, right 0.5s ease",
    opacity: 1,
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
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskDetail));