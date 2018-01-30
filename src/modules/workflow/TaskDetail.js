import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ArrowIcon from 'material-ui-icons/KeyboardArrowRight';
import Typography from 'material-ui/Typography'

import DatePicker from '../../common/IconDatePicker';

class TaskDetail extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     startDate: moment()
  //   };
  // }
  
  // handleChange = (date) => {
  //   console.log(date);
  //   this.setState({
  //     startDate: date
  //   });
  // }


  render() {
    const {classes, showTaskDetail, taskData, selectedTask} = this.props;

    if(selectedTask === null){
      return <div className={classes.hiddenContainer} />;
    }

    const task = taskData[selectedTask];
    
    
    return (
      <div className={this.props.showTaskDetail ? classes.container : classes.hiddenContainer}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <IconButton onClick={() => this.props.actions.toggleTaskDetail()}>
              <ArrowIcon />
            </IconButton>
            <Typography>
              {task.title}
            </Typography>
          </div>
          <DatePicker />
        </div>
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
    boxShadow: "0px 7px 14px 2px rgba(0, 0, 0, 0.5)",
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
    boxShadow: "0px 7px 14px 2px rgba(0, 0, 0, 0.5)",
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b9bbbe'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10, 
  }
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