import React, { Component } from "react";
import CommunitySideNav from "../community/CommunitySideNav";
import ChatSideNav from "../chat/ChatSideNav";
import WorkflowSideNav from "../workflow/WorkflowSideNav";
import { withStyles } from "material-ui/styles";
import { withRouter } from "react-router";
// import SelectableTextButton from '../../common/SelectableTextButton';

import TeamOverviewTitle from './TeamOverviewTitle';

import { Route } from "react-router-dom";

class SideNavModules extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Route path="/community" component={CommunitySideNav} />
        <Route path="/team" component={TeamOverviewTitle} />
        <Route path="/team" component={ChatSideNav} />
        <Route path="/team" component={WorkflowSideNav} />
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: 10
  },
  title: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: "0px 10px 0 32px"
  }
};

export default withStyles(styles)(withRouter(SideNavModules));
