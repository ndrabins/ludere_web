import React, { Component } from "react";
import Paper from "material-ui/Paper";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Tabs, { Tab } from "material-ui/Tabs";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import ArrowBack from "material-ui-icons/ArrowBack";

import { withStyles } from "material-ui/styles";

import CreateWorkspace from "./CreateWorkspace";
import JoinWorkspace from "./JoinWorkspace";

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
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Create Workspace"
            />
            <Tab label="Join Workspace" />
          </Tabs>
          {value === 0 && <div>Item One</div>}
          {value === 1 && <div>Item Two</div>}
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
  content: {
    padding: 40
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(WorkspaceFlow)
);
