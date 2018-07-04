import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "common/Dialog";
import LudereInput from "common/LudereInput";

class CreateBoardButton extends Component {
  state = {
    open: false,
    workflowName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, workflowName: "" });
  };

  handleCreateBoard = () => {
    this.handleClose();
    this.props.actions.createBoard(this.state.workflowName);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <IconButton
          style={styles.createWorkFlowButton}
          onClick={this.handleClickOpen}
        >
          <AddIcon style={{ fontSize: 16 }} />
        </IconButton>
        <Dialog
          handleAction={this.handleCreateBoard}
          open={open}
          handleClose={this.handleClose}
          titleName="Create Workflow"
          actionButtonName="Create"
          color="linear-gradient(to right, rgb(167, 112, 239), rgb(207, 139, 243))"
          helperText="Create a workflow to manage tasks!"
        >
          <LudereInput
            label="Workflow Name"
            value={this.state.workflowName}
            handleChange={this.handleChange("workflowName")}
            helperText=""
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateBoard();
                ev.preventDefault();
              }
            }}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  createWorkFlowButton: {
    width: 22,
    height: 22,
    color: "white",
    background: "linear-gradient(to right, #a770ef, #cf8bf3)"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CreateBoardButton);
