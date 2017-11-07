import React, { Component } from "react";
import colors from "../../utility/constants/colors";
import logoWhite from "../../static/light.svg";

const drawerWidth = 240;

class SideNav extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.teamSideNav}>

        </div>
        <div
          style={
            this.props.drawerVisible
              ? styles.moduleSideNav
              : styles.moduleSideNavClosed
          }
        >
          <div style={styles.sideNavInner}>
            <img src={logoWhite} style={styles.logo} alt="Logo" />
            <p>something something something</p>
            <p>something something something</p>
            <p>something something something</p>
            <p>something something something</p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex"
    // backgroundColor: colors.lightThemePrimary,
    // width: drawerWidth,
  },
  teamSideNav: {
    display: "flex",
    width: 58,
    backgroundColor: "#000000"
  },
  moduleSideNav: {
    position: "relative",
    backgroundColor: colors.lightThemePrimary,
    width: drawerWidth,
    transition: "width 0.75s ease",
    overflow: "hidden",
    boxShadow: "0 9px 18px 0 rgba(0, 0, 0, 0.18)",
  },
  moduleSideNavClosed: {
    width: 0,
    backgroundColor: colors.lightThemePrimary,
    overflow: "hidden",
    transition: "width 0.75s ease"
  },
  sideNavInner: {
    width: drawerWidth
  },
  logo: {
    position: "static",
    padding: 15,
    width: 200,
  }
};

export default SideNav;
