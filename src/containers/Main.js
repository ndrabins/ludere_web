import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import NavBar from "../modules/dashboard/NavBar";
import SideNav from "../modules/dashboard/SideNav";

class Main extends Component {
  render() {
    return (
      <div style={styles.container}>
        <SideNav />
        <NavBar />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: '100%'
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
