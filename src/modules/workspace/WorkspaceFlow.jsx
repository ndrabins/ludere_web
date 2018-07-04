import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Loading from "../../common/Loading";

import { withStyles } from "@material-ui/core/styles";

import CreateWorkspace from "./CreateWorkspace";
// import JoinWorkspace from "./JoinWorkspace";

class WorkspaceFlow extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleCreateWorkspace = values => {
    this.props.actions.createWorkspace(values);
  };

  handleJoinWorkspace = url => {
    this.props.actions.joinWorkspace(url);
  };

  render() {
    const { classes, joiningWorkspaceLoading } = this.props;
    const { value } = this.state;
    if (joiningWorkspaceLoading) {
      return (
        <div style={{ height: "100%" }}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <div className={classes.tabsContainer}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Create Workspace" />
            <Tab label="Join Workspace" />
          </Tabs>
          {value === 0 && <CreateWorkspace />}
          {/* {value === 1 && <JoinWorkspace />} */}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto",
    width: "100%",
    flexGrow: 1
  },
  tabsContainer: {
    minWidth: 400,
    minHeight: 500
  },
  content: {
    padding: 40
  }
};

function mapStateToProps(state) {
  return {
    loadingJoinWorkspace: state.workspace.loadingJoinWorkspace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkspaceFlow));
