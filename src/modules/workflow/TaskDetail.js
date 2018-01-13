import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

class TaskDetail extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={this.props.showTaskDetail ? classes.container : classes.hiddenContainer}>
        <Button onClick={() => this.props.actions.toggleTaskDetail()}> Stuff </Button>
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
    opacity: .2,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskDetail));