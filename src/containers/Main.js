import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Route } from "react-router-dom";

import WorkspaceFlow from "../modules/dashboard/WorkspaceFlow";
import NavBar from "../modules/dashboard/NavBar";
import SideNav from "../modules/dashboard/SideNav";

import Dashboard from "./Dashboard";
import Calendar from "./Calendar";
import Community from "../modules/community/Community";

//Modules
import WorkFlow from "../modules/workflow/Workflow";
import Chat from "../modules/chat/Chat";

const drawerWidth = 298;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerVisible: true
    };
  }

  componentDidMount() {
    this.props.actions.loadAppData(); //eventually this will load all initial data and show loading icon till finished.
    this.props.actions.fetchWorkspaces();
    this.props.actions.fetchUserProfile();
    this.props.history.push("/community/"); //go to community on app load
    // this.props.actions.fetchTeams();
  }

  toggleDrawer() {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }

  render() {
    // if user is not in a company, he must create or join one
    if (Object.keys(this.props.workspaces).length === 0) {
      return <WorkspaceFlow />;
    }

    return (
      <div style={styles.container}>
        <SideNav
          history={this.props.history}
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
            history={this.props.history}
            toggleDrawer={() => this.toggleDrawer()}
            drawerVisible={this.state.drawerVisible}
          />
          <Route exact path="/community/dashboard" component={Dashboard} />
          <Route exact path="/community/calendar" component={Calendar} />
          <Route path="/community" component={Community} />
          <Route path="/team/chat" component={Chat} />
          <Route path="/team/workflow" component={WorkFlow} />
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
    workspaces: state.workspace.workspaces
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
