import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Tooltip from "material-ui/Tooltip";

class AddTeamButton extends Component {
  state = {
    open: false,
    teamName : '',
    description : ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, teamName:'', description:'' });
  };

  handleCreateTeam = () => {
    this.props.actions.createTeam(this.state.teamName);
    this.handleRequestClose();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div>
        <Tooltip id="tooltip-right-start" title="Add team" placement="right">
          <Button
            fab
            aria-label="add"
            style={styles.addTeamButton}
            onClick={this.handleClickOpen}
          >
            <AddIcon color={'white'}/>
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Create Team</DialogTitle>
          <DialogContent>
            <DialogContentText>Create Team description asdfasdf asdfa sdfasd fasdf asdfasf</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Team Name"
              fullWidth
              required
              value={this.state.teamName}
              onChange={this.handleChange('teamName')}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              value={this.state.description}
              onChange={this.handleChange('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateTeam} color="primary" raised style={{color:'white'}}>
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
    border: "2px dashed #c3c3c3",
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  }
};


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTeamButton);
