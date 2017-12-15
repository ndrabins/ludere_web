import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";
import Board from "./Board";

class Workflow extends Component {
  componentWillUnmount() {
    this.props.actions.selectBoard(null);
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
