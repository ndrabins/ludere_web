import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Board from "./boardComponents/Board";
import TaskDetail from "./boardComponents/TaskDetail";
import Loading from "../../common/Loading";
import BoardHeader from "./BoardHeader";
import { withStyles } from "@material-ui/core/styles";

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
      selectedBoard,
      boards,
      classes
    } = this.props;

    if (loadingLists || loadingTasks || loadingBoards) {
      return <Loading />;
    }

    if (boards[selectedBoard] === undefined || selectedBoard === null) {
      return <div> Select a board </div>;
    }

    return (
      <React.Fragment>
        <BoardHeader
          boardName={boards[selectedBoard].boardName}
          boardID={selectedBoard}
        />
        <div className={classes.wrapper}>
          <Board />
          <TaskDetail />
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  root: {
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden"
  },
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
    selectedBoard: state.workflow.selectedBoard,
    boards: state.workflow.boards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Workflow)
);
