import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import colors from "../../utility/constants/colors";
import InviteButton from "./InviteButton";

import MenuIcon from "material-ui-icons/Menu";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

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

  handleCalendarSelect() {
    this.props.history.push("/community/calendar");
    this.props.actions.selectTeam(null);
  }

  handleDashboardSelect() {
    this.props.history.push("/community/dashboard");
    this.props.actions.selectTeam(null);
  }

  render() {
    const { photoURL, displayName, classes } = this.props;

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
          <Button onClick={() => this.handleCalendarSelect()}>Calendar</Button>
          <Button onClick={() => this.handleDashboardSelect()}>
            Dashboard
          </Button>
          <InviteButton />
        </div>
        <div className={classes.navEnd}>
          <Typography className={classes.displayName}>{displayName}</Typography>
          <Avatar
            src={photoURL}
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
              <MenuItem onClick={this.handleRequestCloseNavMenu}>
                Profile
              </MenuItem>
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
    backgroundColor: "#FAFAFA",
    minHeight: 48,
    height: 48,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  navEnd: {
    display: "flex",
    height: "100%",
    alignSelf: "flex-end",
    boxShadow: "0 9px 18px 0 rgba(0,0,0,0.18), 0 5.5px 5px 0 rgba(0,0,0,0.24)",
    borderBottomLeftRadius: 35,
    paddingLeft: 30,
    paddingRight: 20,
    backgroundColor: colors.lightThemePrimary,
    alignItems: "center"
  },
  navBegin: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    width: 26,
    height: 26,
    cursor: "pointer",
    border: "2px solid #C3C3C3"
  },
  displayName: {
    color: "#FFFFFF",
    marginRight: 10
  },
  menuButton: {
    height: 65,
    color: "white",
    width: 58,
    borderRadius: 0,
    backgroundColor: colors.lightThemePrimary
  }
};

function mapStateToProps(state) {
  return {
    photoURL: state.profile.myUserProfile.photoURL,
    displayName: state.profile.myUserProfile.displayName
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
