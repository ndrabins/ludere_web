import React, { Component, Fragment } from "react";
// import CommunitySideNav from "../community/CommunitySideNav";
import ChatSideNav from "../chat/ChatSideNav";
import WorkflowSideNav from "../workflow/WorkflowSideNav";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Scrollbars } from "react-custom-scrollbars";
import Typography from "@material-ui/core/Typography";
import ArrowIcon from "@material-ui/icons/ArrowRightAltRounded";
import SelectTeamIcon from "static/undraw_selectTeam.svg";

import TeamDashboardTitle from "./TeamDashboardTitle";

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
          {showModules ? (
            <Fragment>
              <TeamDashboardTitle />

              <ChatSideNav />
              <WorkflowSideNav />
            </Fragment>
          ) : (
            <div className={classes.teamNotSelected}>
              <ArrowIcon className={classes.arrowIcon} />
              <Typography align="center" className={classes.selectTeamText}>
                Select or Create a team to start collaborating
              </Typography>
              <img
                className={classes.icon}
                src={SelectTeamIcon}
                alt="Team icon"
              />
            </div>
          )}
        </div>
      </Scrollbars>
    );
  }
}

const styles = {
  container: {
    paddingTop: 10,
    width: 240,
    height: "100%"
  },
  title: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: "0px 10px 0 32px"
  },
  teamNotSelected: {
    position: "relative",
    display: "flex",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column"
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200
  },
  arrowIcon: {
    position: "absolute",
    color: "#C98BF1",
    fontSize: 70,
    left: "0",
    top: "26px",
    transform: "rotate(210deg)"
  },
  selectTeamText: {
    color: "#FFFFFF",
    fontSize: 18
  }
};

export default withStyles(styles)(withRouter(SideNavModules));
