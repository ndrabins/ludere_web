import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "material-ui/IconButton";
import AddIcon from "material-ui-icons/Add";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

class CreateBoardButton extends Component {
  state = {
    open: false,
    boardName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, workflowName: "" });
  };

  handleCreateBoard = () => {
    this.handleRequestClose();
    this.props.actions.createBoard(this.state.boardName);
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
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Create Board</DialogTitle>
          <DialogContent style={{ width: 300, maxWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Board Name"
              fullWidth
              autoComplete="off"
              value={this.state.boardName}
              onChange={this.handleChange("boardName")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              raised
              onClick={this.handleCreateBoard}
              color="primary"
              style={{ color: "white" }}
            >
              Create Board
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
