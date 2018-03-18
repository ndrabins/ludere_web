import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Route, Switch } from "react-router-dom";

import WorkspaceFlow from "../modules/dashboard/WorkspaceFlow";
import NavBar from "../modules/dashboard/NavBar";
import SideNav from "../modules/dashboard/SideNav";

import Dashboard from "./Dashboard";
import Calendar from "./Calendar";
import Community from "../modules/community/Community";

//Modules
import WorkFlow from "../modules/workflow/Workflow";
import Chat from "../modules/chat/Chat";
import TeamDashboard from "../modules/team/TeamDashboard";

const drawerWidth = 298;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerVisible: true
    };
  }

  componentDidMount() {
    const { actions, selectedTeam } = this.props;
    actions.fetchWorkspaces();
    actions.fetchUserProfile();

    if (selectedTeam) {
      actions.loadTeamData(selectedTeam);
    }
    // this.props.actions.fetchTeams();
  }

  toggleDrawer() {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }

  render() {
    const { history } = this.props;

    // if user is not in a company, he must create or join one
    if (Object.keys(this.props.workspaces).length === 0) {
      return <WorkspaceFlow />;
    }

    return (
      <div style={styles.container}>
        <SideNav
          history={history}
          toggleDrawer={() => this.toggleDrawer()}
          drawerVisible={this.state.drawerVisible}
        />
        <div
          style={{
            ...styles.content,
            ...{ width: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <NavBar
            history={history}
            toggleDrawer={() => this.toggleDrawer()}
            drawerVisible={this.state.drawerVisible}
          />
          <Switch>
            <Route exact path="/community/dashboard" component={Dashboard} />
            <Route exact path="/community/calendar" component={Calendar} />
            <Route exact path="/" component={Community} />
            <Route exact path="/community" component={Community} />
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
    overflow: "hidden"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
};

function mapStateToProps(state) {
  return {
    workspaces: state.workspace.workspaces,
    selectedTeam: state.team.selectedTeam
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
