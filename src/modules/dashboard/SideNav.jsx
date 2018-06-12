import React, { Component } from "react";
import colors from "../../utility/constants/colors";
import logoWhite from "../../static/light.svg";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import TeamNav from "./TeamNav";
import SideNavModules from "./SideNavModules";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

class SideNav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <TeamNav />
        <div
          className={
            this.props.drawerVisible
              ? classes.moduleSideNav
              : classes.moduleSideNavClosed
          }
        >
          <div className={classes.sideNavInner}>
            <div className={classes.sideNavBanner}>
              <img src={logoWhite} className={classes.logo} alt="Logo" />

              <IconButton
                className={classes.closeButton}
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
    backgroundColor: "#303030",
    minWidth: drawerWidth,
    width: drawerWidth,
    transition: "width 0.5s ease-out, min-width 0.5s ease-out",
    overflow: "hidden",
    boxShadow:
      "0 5.5px 5px 0 rgba(0, 0, 0, 0.24), 0 9px 18px 0 rgba(0, 0, 0, 0.18)"
  },
  moduleSideNavClosed: {
    width: 0,
    minWidth: 0,
    backgroundColor: colors.lightThemePrimary,
    overflow: "hidden",
    transition: "width 0.5s ease-out, min-width 0.5s ease-out"
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

export default withStyles(styles)(SideNav);
