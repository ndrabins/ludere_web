import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import colors from "../../utility/constants/colors";

import MenuIcon from "material-ui-icons/Menu";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Button from "material-ui/Button";

const drawerWidth = 240;

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

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.navBegin}>
          <IconButton style={{height:"100%"}}>
            <MenuIcon />
          </IconButton>
          <Button>Calendar</Button>
          <Button>Dashboard</Button>
          <Button>Invite</Button>
        </div>
        <div style={styles.navEnd}>
          <IconButton style={{ color: "white" }}>
            <MoreVertIcon />
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
              onRequestClose={this.handleRequestCloseNavMenu}
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
    border: "1px solid #979797",
    height: 64,
    marginTop: -3,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row"
  },
  navEnd: {
    display: "flex",
    height: "100%",
    alignSelf: "flex-end",
    boxShadow: "0 5.5px 5px 0 rgba(0, 0, 0, 0.24)",
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
