import React, { Component } from "react";
import colors from "../../utility/constants/colors"

const drawerWidth = 240;

class SideNav extends Component {
  render() {
    return (
      <div style={styles.container}>
        SideNav
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    backgroundColor: colors.lightThemePrimary,
    width: drawerWidth,
  }
};

export default SideNav;
