import React, { Component } from "react";

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
    backgroundColor: "red",
  }
};

export default SideNav;
