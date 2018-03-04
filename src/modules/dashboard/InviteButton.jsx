import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import PersonAdd from "material-ui-icons/PersonAdd";
import { withStyles } from "material-ui/styles";
import Dialog, { DialogTitle, DialogContent } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class InviteButton extends Component {
  state = {
    open: false,
    copied: false,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCopy = () => {
    console.log("copying");
    document.execCommand("sdfasdfasdf");
  };

  render() {
    const { classes, selectedWorkspace, workspaces } = this.props;
    const { open, copiedValue, copied } = this.state;

    const myWorkspace = workspaces[selectedWorkspace];
    const localURL = window.location.href.split('/'); //get just base URL
    const url=`${localURL[2]}/joinWorkspace/${selectedWorkspace}`

    return (
      <div className={classes.container}>
        <Button onClick={this.handleClickOpen}>
          Invite
          <PersonAdd className={classes.personAdd} />
        </Button>
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
             <CopyToClipboard text={url}
              onCopy={() => this.setState({copied: true})}>
              <Button variant="raised"> {copied ? "COPIED" : "COPY" }</Button>
            </CopyToClipboard>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center"
  },
  personAdd: {
    color: "white",
    background: "linear-gradient(to right, #29b6f6, #796eff)",
    width: 22,
    height: 22,
    borderRadius: 20,
    marginLeft: 10,
    padding: 2
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
