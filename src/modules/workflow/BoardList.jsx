import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "../../actions";
import Map from "lodash/map";

import BoardButton from "./BoardButton";

class BoardList extends Component {
  renderBoards() {
    if (!this.props.boards) {
      return;
    }
    let boards = Map(this.props.boards, (board, key) => {
      return (
        <div key={key}>
          <BoardButton boardID={key} name={board.boardName} />
        </div>
      );
    });
    return boards;
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.container}>{this.renderBoards()}</div>;
  }
}

const styles = {
  container: {}
};

function mapStateToProps(state) {
  return {
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
)(withStyles(styles)(BoardList));
