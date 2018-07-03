import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Board from "./boardComponents/Board";
import TaskDetail from "./boardComponents/TaskDetail";
import Loading from "../../common/Loading";
import BoardHeader from "./BoardHeader";
import ListIcon from "../../static/list.svg";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
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
      selectedBoard,
      boards,
      classes
    } = this.props;

    if (boards[selectedBoard] === undefined || selectedBoard === null) {
      return (
        <div style={styles.unselectedBoardContainer}>
          <Typography variant="display2">
            Start by selecting a workflow!
          </Typography>
          <img style={styles.icon} src={ListIcon} alt="list icon" />
        </div>
      );
    }

    if (loadingLists || loadingTasks || loadingBoards) {
      return <Loading />;
    }

    return (
      <Fade in={true} timeout={{ enter: 800, exit: 800 }}>
        <div className={classes.root}>
          <BoardHeader
            boardName={boards[selectedBoard].boardName}
            boardID={selectedBoard}
          />
          <div className={classes.wrapper}>
            <Board />
            <TaskDetail />
          </div>
        </div>
      </Fade>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  wrapper: {
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
    display: "flex"
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200
  },
  unselectedBoardContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Workflow));
