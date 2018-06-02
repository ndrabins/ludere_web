import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Board from "./boardComponents/Board";
import TaskDetail from "./boardComponents/TaskDetail";
import Loading from "../../common/Loading";
import Fade from "@material-ui/core/Fade";

class Workflow extends Component {
  componentWillUnmount() {
    this.props.actions.toggleTaskDetail();
    this.props.actions.selectBoard(null);
  }

  render() {
    const {
      loadingTasks,
      loadingLists,
      loadingBoards,
      selectedBoard
    } = this.props;

    if (
      loadingLists ||
      loadingTasks ||
      loadingBoards ||
      selectedBoard === null
    ) {
      return <Loading />;
    }

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
    overflowY: "auto",
    display: "flex"
  }
};

function mapStateToProps(state) {
  return {
    loadingLists: state.workflow.loadingLists,
    loadingTasks: state.workflow.loadingTasks,
    loadingBoards: state.workflow.loadingBoards,
    selectedBoard: state.workflow.selectedBoard
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
