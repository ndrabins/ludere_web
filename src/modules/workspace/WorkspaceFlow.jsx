import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Loading from "../../common/Loading";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import backgroundImg from "../../static/mountains.png";

import logoWhite from "../../static/light.svg";
import CreateWorkspace from "./CreateWorkspace";

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
        <img src={logoWhite} alt="Logo" />
        <Paper className={classes.createWorkspaceContainer}>
          <CreateWorkspace />
        </Paper>
        {/* {value === 1 && <JoinWorkspace />} */}
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
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Roboto",
    width: "100%",
    flexGrow: 1,
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover"
  },
  createWorkspaceContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#303030",
    opacity: 0.85,
    padding: 10,
    marginTop: 20,
    minWidth: 350,
    maxWidth: 500,
    marginLeft: 20,
    marginRight: 20
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
