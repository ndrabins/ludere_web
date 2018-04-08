import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import PersonAdd from "material-ui-icons/PersonAdd";
import { withStyles } from "material-ui/styles";
import Dialog, { DialogTitle, DialogContent } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";

class InviteButton extends Component {
  state = {
    open: false,
    copied: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, selectedWorkspace } = this.props;
    const { open, copied } = this.state;

    const localURL = window.location.href.split("/"); //get just base URL
    const url = `https://${localURL[2]}/joinWorkspace/${selectedWorkspace}`;

    return (
      <div className={classes.container}>
        <IconButton
          onClick={this.handleClickOpen}
          className={classes.inviteButton}
        >
          <PersonAdd className={classes.personAdd} />
        </IconButton>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Share this url to invite!</DialogTitle>
          <DialogContent>
            <TextField
              id="url"
              label="Invite URL"
              className={classes.textField}
              value={url}
              margin="normal"
            />
            <CopyToClipboard
              text={url}
              onCopy={() => this.setState({ copied: true })}
            >
              <Button variant="raised"> {copied ? "COPIED" : "COPY"}</Button>
            </CopyToClipboard>
          </DialogContent>
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
  workspaceButton: {
    background: "linear-gradient(to left, #13F1FC, #29B6F6)",
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 25,
    color: "white"
  },
  teamButton: {
    background: "linear-gradient(to right, #e57373, #ee8d68)",
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 25,
    color: "white"
  },
  textField: {
    width: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

function mapStateToProps(state) {
  return {
    selectedWorkspace: state.workspace.selectedWorkspace,
    workspaces: state.workspace.workspaces
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(InviteButton));
