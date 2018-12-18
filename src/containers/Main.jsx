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
import Profile from "../modules/dashboard/Profile/Profile";
import ErrorBoundary from "common/Utility/ErrorBoundary";

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
            <ErrorBoundary>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/" component={Profile} />
              <Route exact path="/team" component={TeamDashboard} />
              <Route path="/team/chat" component={Chat} />
              <Route path="/team/workflow" component={WorkFlow} />
            </ErrorBoundary>
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
