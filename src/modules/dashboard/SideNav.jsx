import React, { Component } from "react";
import colors from "../../utility/constants/colors";
import logoWhite from "../../static/light.svg";

import CloseIcon from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";

import TeamNav from "./TeamNav";
import SideNavModules from "./SideNavModules";

const drawerWidth = 240;

class SideNav extends Component {
  render() {
    return (
      <div style={styles.container}>
        <TeamNav />
        <div
          style={
            this.props.drawerVisible
              ? styles.moduleSideNav
              : styles.moduleSideNavClosed
          }
        >
          <div style={styles.sideNavInner}>
            <div style={styles.sideNavBanner}>
              <img src={logoWhite} style={styles.logo} alt="Logo" />
              <IconButton
                style={styles.closeButton}
                onClick={this.props.toggleDrawer}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <SideNavModules />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    // backgroundColor: colors.lightThemePrimary,
    // width: drawerWidth,
    overflow: "hidden",
    height: "100%"
  },
  teamSideNav: {
    display: "flex",
    width: 58,
    backgroundColor: "#000000"
  },
  moduleSideNav: {
    position: "relative",
    backgroundColor: "#333333",
    width: drawerWidth,
    transition: "width 0.75s ease-out",
    overflow: "hidden",
    boxShadow:
      "0 5.5px 5px 0 rgba(0, 0, 0, 0.24), 0 9px 18px 0 rgba(0, 0, 0, 0.18)"
  },
  moduleSideNavClosed: {
    width: 0,
    backgroundColor: colors.lightThemePrimary,
    overflow: "hidden",
    transition: "width 0.75s ease-out"
  },
  sideNavInner: {
    width: drawerWidth
  },
  sideNavBanner: {
    height: 64,
    width: drawerWidth,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden"
  },
  logo: {
    display: "flex",
    // width: "90%"
    maxWidth: 160,
    marginLeft: 5
  },
  closeButton: {
    display: "flex",
    color: "#c3c3c3",
    alignSelf: "flex-end",
    margin: 5
  }
};

export default SideNav;
