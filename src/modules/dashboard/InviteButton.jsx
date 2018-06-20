import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "common/Dialog";
import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";

class InviteButton extends Component {
  state = {
    open: false,
    copied: false
  };

  handleClose = () => {
    this.setState({ open: false, copied: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, selectedWorkspace } = this.props;
    const { open, copied } = this.state;

    const localURL = window.location.href.split("/"); //get just base URL
    const url = `https://${localURL[2]}/auth/${selectedWorkspace}`;

    return (
      <div className={classes.container}>
        <IconButton
          onClick={this.handleClickOpen}
          className={classes.inviteButton}
        >
          <PersonAdd className={classes.personAdd} />
        </IconButton>

        <Dialog
          handleAction={this.handleCreateTeam}
          open={open}
          handleClose={this.handleClose}
          titleName="Invite team members"
          actionButtonName="Create"
          color="linear-gradient(to right, #29b6f6, #796eff)"
          helperText="Share this URL with teammates so they can sign up and join your workspace!"
          showActionButtons={false}
        >
          <TextField
            id="url"
            label="Invite URL"
            className={classes.textField}
            value={url}
            margin="normal"
            fullWidth
          />
          <CopyToClipboard
            text={url}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button variant="raised" className={classes.copyButton}>
              {copied ? "COPIED" : "COPY"}
            </Button>
          </CopyToClipboard>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  personAdd: {
    color: "white",
    fontSize: 16
  },
  inviteButton: {
    width: 24,
    height: 24,
    background: "linear-gradient(to right, #29b6f6, #796eff)"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  copyButton: {
    color: "rgba(255,255,255,.8)",
    background: "linear-gradient(to right, #29b6f6, #796eff)"
  }
});

function mapStateToProps(state) {
  return {
    selectedWorkspace: state.workspace.selectedWorkspace,
    workspaces: state.workspace.workspaces
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(InviteButton));
