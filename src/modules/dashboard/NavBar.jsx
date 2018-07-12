import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import InviteButton from "./InviteButton";

import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import NotifcationIcon from "@material-ui/icons/NotificationsNoneRounded";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";

class NavBar extends Component {
  state = {
    anchorEl: null,
    headwayInitialized: false
  };

  componentDidMount() {
    const { headwayInitialized } = this.state;
    if (!headwayInitialized) {
      this.setState({ headwayInitialized: true });
      var config = {
        selector: ".changelog",
        trigger: ".changelogToggle",
        account: "J5eVgJ"
      };
      window.Headway.init(config);
    }
  }

  handleClickNavMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfileSelect = () => {
    this.props.history.push("/profile/");
    this.handleClose();
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
    const { anchorEl } = this.state;

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
          <div className={classes.changelogContainer}>
            <NotifcationIcon className="changlelogToggle" />
            <span
              className="changelog"
              style={{ position: "absolute", right: 30, bottom: 24 }}
            />
          </div>
          <Typography className={classes.displayName}>
            {profile.displayName}
          </Typography>
          <Avatar
            src={profile.photoURL}
            onClick={this.handleClickNavMenu}
            className={classes.avatar}
          />
          <div>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <div className={classes.profileMenu}>
                <MenuItem onClick={this.handleProfileSelect}>
                  <ListItemIcon className={classes.icon}>
                    <AccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={() => this.props.actions.signOutUser()}>
                  <ListItemIcon className={classes.icon}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </div>
            </Popover>
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
    color: "white",
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
  profileMenu: {
    minWidth: 160
  },
  menuButton: {
    height: "100%",
    color: "white",
    borderRadius: 0,
    backgroundColor: "#2a2a2a",
    "&:hover": {
      backgroundColor: "#2a2a2a"
    }
  },
  changelogContainer: {
    position: "relative",
    paddingRight: 8,
    color: "white"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
