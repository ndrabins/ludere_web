import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "../../../actions";
import PersonIcon from "@material-ui/icons/PersonOutline";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Map from "lodash/map";

class AssignUser extends Component {
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
    console.log("assigning user");
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      task,
      taskID,
      classes,
      teams,
      selectedTeam,
      workspaceMembers
    } = this.props;
    const { anchorEl } = this.state;

    console.log(teams);
    console.log(workspaceMembers);

    const teamMembers = teams[selectedTeam].members; // array of userIDs in team

    return (
      <div style={styles.container}>
        <IconButton
          className={classes.iconButton}
          onClick={this.assignUserClick}
        >
          <PersonIcon className={classes.icon} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {Map(teamMembers, (isMember, memberID) => {
            return (
              isMember && (
                <MenuItem
                  key={memberID}
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary={workspaceMembers[memberID].displayName}
                  />
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
  icon: {
    fontSize: 24,
    color: "inherit"
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  listItemIcon: {}
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
