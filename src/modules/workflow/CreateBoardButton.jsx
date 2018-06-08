import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class CreateBoardButton extends Component {
  state = {
    open: false,
    workflowName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, workflowName: "" });
  };

  handleCreateBoard = () => {
    this.handleRequestClose();
    this.props.actions.createBoard(this.state.workflowName);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div>
        <IconButton
          style={styles.createWorkFlowButton}
          onClick={this.handleClickOpen}
        >
          <AddIcon style={{ fontSize: 16 }} />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Create Workflow</DialogTitle>
          <DialogContent style={{ width: 300, maxWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Workflow Name"
              fullWidth
              autoComplete="off"
              value={this.state.workflowName}
              onChange={this.handleChange("workflowName")}
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleCreateBoard();
                  ev.preventDefault();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              onClick={this.handleCreateBoard}
              color="primary"
              style={{ color: "white" }}
            >
              Create Workflow
            </Button>
          </DialogActions>
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

export default connect(null, mapDispatchToProps)(CreateBoardButton);
