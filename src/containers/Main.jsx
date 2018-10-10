import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import { withStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import WorkspaceFlow from "../modules/workspace/WorkspaceFlow";
import NavBar from "../modules/dashboard/NavBar";
import SideNav from "../modules/dashboard/SideNav";
import Loading from "../common/Loading";

// import Dashboard from "./Dashboard";
// import Calendar from "./Calendar";
import Profile from "../modules/dashboard/Profile/Profile";
// import Community from "../modules/community/Community";

//Modules
import WorkFlow from "../modules/workflow/Workflow";
import Chat from "../modules/chat/Chat";
import TeamDashboard from "../modules/team/TeamDashboard";

const DRAWER_WIDTH = 300;

class Main extends Component {
  state = {
    drawerVisible: true,
  };

  componentDidMount() {
    const { actions, selectedTeam } = this.props;
    actions.fetchWorkspaces();
    if (selectedTeam) {
      actions.loadTeamData(selectedTeam);
    }
    actions.fetchNotifications();

    // firebase
    //   .messaging()
    //   .usePublicVapidKey(
    //     "BJb2ITjssD1V0VxkbwpzWW1-7qWLjHdsZux-cizph8Ex4KQ-OfrFdtjY8RTx-4z61IHgBI3q9-n-nnhEXy4RBuQ"
    //   );

    // firebase
    //   .messaging()
    //   .requestPermission()
    //   .then(function() {
    //     console.log("Notification permission granted.");
    //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
    //     // ...
    //   })
    //   .catch(function(err) {
    //     console.log("Unable to get permission to notify.", err);
    //   });
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.unsubscribeFromChannels();
  }

  toggleDrawer() {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }

  render() {
    const {
      history,
      loadingWorkspaces,
      loadingProfile,
      loadingUsers,
      classes,
    } = this.props;

    const { drawerVisible } = this.state;

    if (loadingWorkspaces || loadingProfile || loadingUsers) {
      return <Loading />;
    }

    // if user is not in a company, they must create or join one
    if (Object.keys(this.props.workspaces).length === 0) {
      return <WorkspaceFlow />;
    }

    return (
      <div className={classes.container}>
        <SideNav
          history={history}
          toggleDrawer={() => this.toggleDrawer()}
          drawerVisible={drawerVisible}
        />
        <div
          style={{
            width: `calc(100% - ${drawerVisible ? DRAWER_WIDTH : 0}px)`,
          }}
          className={classes.content}
        >
          <NavBar
            history={history}
            toggleDrawer={() => this.toggleDrawer()}
            drawerVisible={drawerVisible}
          />
          <Switch>
            {/* <Route exact path="/community/dashboard" component={Dashboard} />
            <Route exact path="/community/calendar" component={Calendar} />
            <Route exact path="/community" component={Community} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Profile} />
            <Route exact path="/team" component={TeamDashboard} />
            <Route path="/team/chat" component={Chat} />
            <Route path="/team/workflow" component={WorkFlow} />
          </Switch>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    maxHeight: "100%",
    flex: 1,
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    transition: "width 0.5s ease-out",
  },
};

function mapStateToProps(state) {
  return {
    workspaces: state.workspace.workspaces,
    selectedTeam: state.team.selectedTeam,
    loadingWorkspaces: state.workspace.loadingWorkspaces,
    loadingProfile: state.profile.loading,
    myUserProfile: state.profile.myUserProfile,
    loadingUsers: state.workspace.loadingUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Main));
