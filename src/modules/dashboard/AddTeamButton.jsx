import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

class AddTeamButton extends Component {
  state = {
    open: false,
    teamName: "",
    description: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, teamName: "", description: "" });
  };

  handleCreateTeam = () => {
    if (this.state.teamName.length < 2) {
      return;
    }
    this.props.actions.createTeam(this.state.teamName);
    this.props.history.push("/team");
    this.handleRequestClose();
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div>
        <Tooltip id="tooltip-right-start" title="Add team" placement="right">
          <Button
            variant="fab"
            aria-label="add"
            style={styles.addTeamButton}
            onClick={this.handleClickOpen}
          >
            <AddIcon style={{ color: "#B8B8B8", fontSize: 16 }} />
          </Button>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Create Team</DialogTitle>
          <DialogContent>
            <DialogContentText>Create Team description</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Team Name"
              fullWidth
              required
              value={this.state.teamName}
              onChange={this.handleChange("teamName")}
              autoComplete="false"
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleCreateTeam();
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
              onClick={this.handleCreateTeam}
              variant="raised"
              color="primary"
              style={{ color: "white" }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  addTeamButton: {
    width: 36,
    height: 36,
    margin: "8px 0px 8px 0px",
    border: "1px dashed #c3c3c3",
    backgroundColor: "rgba(0, 0, 0, 0.0)"
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AddTeamButton)
);
