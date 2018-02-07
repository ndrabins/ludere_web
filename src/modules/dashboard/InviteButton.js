import React, { Component } from "react";
import Button from "material-ui/Button";
import PersonAdd from "material-ui-icons/PersonAdd";
import { withStyles } from "material-ui/styles";
import Dialog, { DialogTitle, DialogContent } from "material-ui/Dialog";

class InviteButton extends Component {
  state = {
    open: false,
    selectedValue: "",
    choice: ""
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  setChoice = choice => {
    this.setState({ choice: choice });
  };

  choiceContent = () => {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.workspaceButton}
          onClick={() => this.setChoice("workspace")}
        >
          Invite to team
        </Button>
        <Button
          className={classes.teamButton}
          onClick={() => this.setChoice("team")}
        >
          Invite to workspace
        </Button>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Button onClick={this.handleClickOpen}>
          Invite
          <PersonAdd className={classes.personAdd} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogContent>{this.choiceContent()}</DialogContent>
          <div />
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
  }
});

export default withStyles(styles)(InviteButton);
