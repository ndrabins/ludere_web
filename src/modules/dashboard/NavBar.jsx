import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import colors from "../../utility/constants/colors";
import InviteButton from "./InviteButton";

import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

class NavBar extends Component {
  state = {
    anchorEl: null,
    openNavMenu: false
  };

  handleClickNavMenu = event => {
    this.setState({ openNavMenu: true, anchorEl: event.currentTarget });
  };

  handleRequestCloseNavMenu = () => {
    this.setState({ openNavMenu: false });
  };

  handleProfileSelect = () => {
    this.props.history.push("/profile/");
    this.handleRequestCloseNavMenu();
  };

  handleCalendarSelect() {
    this.props.history.push("/community/calendar");
    this.props.actions.selectTeam(null);
  }

  handleDashboardSelect() {
    this.props.history.push("/community/dashboard");
    this.props.actions.selectTeam(null);
  }

  render() {
    const { profile, classes } = this.props;

    if (profile === undefined) {
      return <div />;
    }

    return (
      <div className={classes.container}>
        <div className={classes.navBegin}>
          {!this.props.drawerVisible && (
            <Button
              className={classes.menuButton}
              onClick={this.props.toggleDrawer}
            >
              <MenuIcon />
            </Button>
          )}
          {/* <Button onClick={() => this.handleCalendarSelect()}>Calendar</Button>
          <Button onClick={() => this.handleDashboardSelect()}>
            Dashboard
          </Button> */}
          <InviteButton />
        </div>
        <div className={classes.navEnd}>
          <Typography className={classes.displayName}>
            {profile.displayName}
          </Typography>
          <Avatar
            src={profile.photoURL}
            onClick={this.handleClickNavMenu}
            className={classes.avatar}
          />
          <div>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.openNavMenu}
              onClose={this.handleRequestCloseNavMenu}
            >
              <MenuItem onClick={this.handleProfileSelect}>Profile</MenuItem>
              <MenuItem onClick={() => this.props.actions.signOutUser()}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    minHeight: 48,
    height: 48,
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 10
  },
  navEnd: {
    display: "flex",
    height: "100%",
    alignSelf: "flex-end",
    boxShadow: "0 9px 18px 0 rgba(0,0,0,0.18), 0 5.5px 5px 0 rgba(0,0,0,0.24)",
    borderBottomLeftRadius: 35,
    paddingLeft: 30,
    paddingRight: 20,
    backgroundColor: "#2a2a2a",
    alignItems: "center"
  },
  navBegin: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    width: 34,
    height: 34,
    cursor: "pointer",
    boxShadow: "0px 0px 0px 2px #C3C3C3"
  },
  displayName: {
    color: "#FFFFFF",
    marginRight: 10
  },
  menuButton: {
    height: "100%",
    color: "white",
    borderRadius: 0,
    backgroundColor: "#2a2a2a",
    "&:hover": {
      backgroundColor: "#2a2a2a"
    }
  }
};

function mapStateToProps(state) {
  return {
    profile: state.profile.myUserProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBar)
);
