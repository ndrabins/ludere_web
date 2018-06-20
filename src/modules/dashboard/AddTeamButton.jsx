import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "common/Dialog";
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

  handleClose = () => {
    this.setState({ open: false, teamName: "", description: "" });
  };

  handleCreateTeam = () => {
    if (this.state.teamName.length < 2) {
      return;
    }
    this.props.actions.createTeam(this.state.teamName);
    this.props.history.push("/team");
    this.handleClose();
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { open, teamName } = this.state;
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
        <Dialog
          handleAction={this.handleCreateTeam}
          open={open}
          handleClose={this.handleClose}
          titleName="Create a new team"
          actionButtonName="Create"
          color="linear-gradient(to left, #6fe5c9, #00bcd4)"
          helperText=""
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            fullWidth
            autoComplete="off"
            value={teamName}
            onChange={this.handleChange("teamName")}
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateTeam();
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
