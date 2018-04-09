import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Board from "./boardComponents/Board";
import TaskDetail from "./boardComponents/TaskDetail";

class Workflow extends Component {
  componentWillUnmount() {
    this.props.actions.selectBoard(null);
    this.props.actions.toggleTaskDetail();
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Board />
        <TaskDetail />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

const styles = {
  wrapper: {
    height: "100%",
    overflowX: "auto",
    overflowY: "auto"
  }
};

export default connect(null, mapDispatchToProps)(Workflow);
