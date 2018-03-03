import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Link } from "react-router-dom";

import colors from "../../utility/constants/colors";
import InviteButton from './InviteButton'

import MenuIcon from "material-ui-icons/Menu";
import NotificationsIcon from "material-ui-icons/Notifications";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import MoreVertIcon from "material-ui-icons/MoreVert";
import PersonAdd from 'material-ui-icons/PersonAdd';

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
    return (
      <div style={styles.container}>
        <div style={styles.navBegin}>
          {!this.props.drawerVisible && (
            <Button
              style={styles.menuButton}
              onClick={this.props.toggleDrawer}
            >
              <MenuIcon />
            </Button>
          )}
          <Button onClick={() => this.handleCalendarSelect()} disabled>
            Calendar
          </Button>
          <Button onClick={() => this.handleDashboardSelect()} disabled>
            Dashboard
          </Button>
          <InviteButton />
        </div>
        <div style={styles.navEnd}>
          <IconButton style={{ color: "white" }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar> N </Avatar>
          <div>
            <IconButton
              style={{ color: "white" }}
              onClick={this.handleClickNavMenu}
            >
              <MoreVertIcon />
            </IconButton>
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
    backgroundColor: colors.lightThemeDefault,
    borderBottom: "1px solid #B9BBBE",
    minHeight: 64,
    height: 64,
    justifyContent: "space-between",
    flexDirection: "row",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.24)"
  },
  navEnd: {
    display: "flex",
    height: "100%",
    alignSelf: "flex-end",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.24)",
    borderBottomLeftRadius: 100,
    width: 188,
    backgroundColor: colors.lightThemePrimary,
    justifyContent: "center",
    alignItems: "center"
  },
  navBegin: {
    display: "flex",
    justifyContent: "center",
  },
  menuButton: {
    height: 65,
    color: "white",
    width: 58,
    borderRadius: 0,
    backgroundColor: colors.lightThemePrimary
  },
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
