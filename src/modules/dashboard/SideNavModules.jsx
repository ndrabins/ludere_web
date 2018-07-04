import React, { Component, Fragment } from "react";
// import CommunitySideNav from "../community/CommunitySideNav";
import ChatSideNav from "../chat/ChatSideNav";
import WorkflowSideNav from "../workflow/WorkflowSideNav";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Scrollbars } from "react-custom-scrollbars";
// import SelectableTextButton from '../../common/SelectableTextButton';

import TeamDashboard from "./TeamDashboardTitle";

class SideNavModules extends Component {
  render() {
    const { classes, location } = this.props;
    const { pathname } = location;
    const showModules =
      pathname.includes("team") || pathname.includes("profile");
    return (
      <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
        <div className={classes.container}>
          {/* <Route exact path="/" component={CommunitySideNav} />
        <Route path="/community" component={CommunitySideNav} /> */}
          {showModules && (
            <Fragment>
              <TeamDashboard />

              <ChatSideNav />
              <WorkflowSideNav />
            </Fragment>
          )}
        </div>
      </Scrollbars>
    );
  }
}

const styles = {
  container: {
    marginTop: 10,
    width: 240
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
