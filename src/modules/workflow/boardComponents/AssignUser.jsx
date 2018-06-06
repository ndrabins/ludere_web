import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "../../../actions";
import PersonIcon from "@material-ui/icons/PersonOutline";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

import Map from "lodash/map";
import pickBy from "lodash/pickBy";

class AssignUser extends PureComponent {
  state = {
    showAssignUser: false,
    anchorEl: null
  };

  assignUserClick = event => {
    const { showAssignUser } = this.state;
    event.stopPropagation();
    this.setState({
      showAssignUser: !showAssignUser,
      anchorEl: event.currentTarget
    });
  };

  assignUserToTask = (event, userID) => {
    const { actions, task, taskID } = this.props;
    event.stopPropagation();
    let isMemberAssigned = task.assigned[userID];
    let updatedTask = { ...task };
    updatedTask.assigned[userID] = !isMemberAssigned; //toggles assigning user
    actions.updateTask(updatedTask, taskID);
  };

  getAssignedUsersContent = () => {
    const { classes, task, workspaceMembers, hovered } = this.props;
    const possibleUsers = { ...task.assigned }; //all users that have been assigned or unassigned

    // get only the users that are assigned
    let assignedUsers = pickBy(possibleUsers, user => user === true);

    if (Object.keys(assignedUsers).length >= 1) {
      return (
        <div className={classes.assignedUsersContainer}>
          {Map(assignedUsers, (isAssigned, memberID) => {
            let teamMember = workspaceMembers[memberID];
            return (
              <Tooltip
                key={memberID}
                id="tooltip-icon"
                title={teamMember.displayName}
              >
                <Avatar
                  className={classes.avatar}
                  alt="Person"
                  src={teamMember.photoURL}
                  onClick={this.assignUserClick}
                />
              </Tooltip>
            );
          })}
        </div>
      );
    } else {
      return (
        hovered && (
          <IconButton
            className={classes.iconButton}
            onClick={this.assignUserClick}
          >
            <PersonIcon className={classes.icon} />
          </IconButton>
        )
      );
    }
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, teams, selectedTeam, workspaceMembers, task } = this.props;
    const { anchorEl } = this.state;

    const teamMembers = teams[selectedTeam].members; // array of userIDs in team
    return (
      <div style={styles.container}>
        {this.getAssignedUsersContent()}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 500,
              width: 400
            }
          }}
        >
          {Map(teamMembers, (isTeamMember, memberID) => {
            let teamMember = workspaceMembers[memberID];
            let isMemberAssigned = task.assigned[memberID] || false;

            return (
              isTeamMember && (
                <MenuItem
                  key={memberID}
                  onClick={event => this.assignUserToTask(event, memberID)}
                >
                  <Avatar alt="Person" src={teamMember.photoURL} />
                  <ListItemText inset primary={teamMember.displayName} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      checked={isMemberAssigned}
                      tabIndex={-1}
                      disableRipple
                      onClick={event => this.assignUserToTask(event, memberID)}
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}
                    />
                  </ListItemSecondaryAction>
                </MenuItem>
              )
            );
          })}
        </Menu>
      </div>
    );
  }
}

const styles = theme => ({
  iconButton: {
    width: 30,
    height: 30,
    border: "dashed 1px #b9bbbe",
    marginLeft: 4,
    color: "#b9bbbe",
    transition: "border 0.25s ease-out, color 0.25s ease-out",
    "&:hover": {
      border: "solid 1px #303030",
      color: "#303030"
    }
  },
  root: {
    "&$checked": {
      color: "#00BCD4"
    }
  },
  checked: {},
  icon: {
    fontSize: 24,
    color: "inherit"
  },
  avatar: {
    width: 30,
    height: 30,
    boxShadow: " 0px 0px 0px 2px white",
    marginLeft: "-10px",
    transition: "box-shadow 0.25s ease-out, transform 0.25s ease-out",
    "&:hover": {
      zIndex: 10,
      transform: "scale(1.1)",
      boxShadow: "0px 0px 0px 2px #303030"
    }
  },
  assignedUsersContainer: {
    display: "flex",
    marginLeft: 15
  }
});

function mapStateToProps(state) {
  return {
    workspaceMembers: state.workspace.workspaceUsers,
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AssignUser)
);
