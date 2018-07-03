import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Map from "lodash/map";

class TeamMembers extends Component {
  state = {
    anchorEl: null,
    selectedUserID: null
  };

  handleMenuClick = (event, userID) => {
    this.setState({ anchorEl: event.currentTarget, selectedUserID: userID });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAddClick = userID => {
    const { selectedTeam } = this.props;
    this.props.actions.joinTeam(selectedTeam, userID);
  };

  handleRemoveClick = userID => {
    const { selectedTeam } = this.props;
    this.props.actions.removeFromTeam(selectedTeam, userID);
    this.handleClose();
  };

  render() {
    const {
      classes,
      workspaceMembers,
      teams,
      selectedTeam,
      loading,
      myUserID
    } = this.props;

    const { anchorEl, selectedUserID } = this.state;

    if (loading || !teams[selectedTeam]) {
      return <div> loading </div>;
    }

    const teamMembers = teams[selectedTeam].members;

    return (
      <div className={classes.root}>
        <List className={classes.listRoot} dense>
          {Map(workspaceMembers, (member, userID) => {
            return (
              <ListItem key={userID} button className={classes.listItem}>
                <Avatar src={member.photoURL} className={classes.avatar} />
                <ListItemText primary={`${member.displayName}`} />
                <ListItemSecondaryAction>
                  {!teamMembers[userID] ? (
                    <IconButton
                      className={classes.button}
                      aria-label="Add Team Member"
                      onClick={() => this.handleAddClick(userID)}
                    >
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <div>
                      <IconButton
                        aria-owns={anchorEl ? "simple-menu" : null}
                        aria-haspopup="true"
                        onClick={ev => this.handleMenuClick(ev, userID)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedUserID === userID}
                        onClose={this.handleClose}
                      >
                        <MenuItem
                          disabled={myUserID === userID}
                          onClick={() => this.handleRemoveClick(userID)}
                        >
                          Remove Member
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    height: "100%"
  },
  listRoot: {
    paddingTop: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  listItem: {
    width: "100%"
  },
  avatar: {
    height: 40,
    width: 40
  },
  button: {
    color: "#00BCD4"
  }
});

function mapStateToProps(state) {
  return {
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam,
    loading: state.team.loading,
    myUserID: state.auth.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TeamMembers));
