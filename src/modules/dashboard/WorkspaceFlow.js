import React, { Component } from "react";
import Paper from "material-ui/Paper";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Button from "material-ui/Button";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import JoinWorkspaceForm from "./JoinWorkspaceForm";

class WorkspaceFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: null
    };
  }

  selectOption(optionChoice) {
    console.log(optionChoice);
    this.setState({
      option: optionChoice
    });
  }

  renderInitialState() {
    return (
      <Paper style={styles.content} elevation={4}>
        <Paper style={styles.workspaceOption} elevation={1}>
          <div>Create</div>
          <div>
            <Button
              style={{
                ...styles.workspaceOptionButton,
                ...{
                  background: "linear-gradient(to left, #6fe5c9, #00bcd4)"
                }
              }}
              raised
              onClick={() => this.selectOption("create")}
            >
              Create Workspace
            </Button>
          </div>
        </Paper>
        <Paper style={styles.workspaceOption} elevation={1}>
          <div>Join</div>
          <Button
            style={{
              ...styles.workspaceOptionButton,
              ...{
                background: "linear-gradient(to right, #a770ef, #cf8bf3)"
              }
            }}
            raised
            onClick={() => this.selectOption("join")}
          >
            Join Workspace
          </Button>
        </Paper>
      </Paper>
    );
  }

  // handleCreateWorkspace(event){
  //   event.preventDefault();
  //   this.props.actions.createWorkspace()
  // }
  handleCreateWorkspace = (values) => {
    // print the form values to the console
    this.props.actions.createWorkspace(values);
  }

  renderCreateWorkspace() {
    return (
      <Paper style={styles.content} elevation={4}>
        <CreateWorkspaceForm onSubmit={this.handleCreateWorkspace}/>
      </Paper>
    );
  }

  renderJoinWorkspace() {
    return (
      <Paper style={styles.content} elevation={4}>
        <JoinWorkspaceForm />
      </Paper>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        {!this.state.option && this.renderInitialState()}
        {this.state.option === "create" && this.renderCreateWorkspace()}
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
    fontFamily: "Roboto"
  },
  content: {
    padding: 16,
    width: "40%",
    height: "60%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#6d6d6d",
    borderRadius: 5
  },
  header: {
    marginTop: 0,
    marginBottom: 0
  },
  workspaceOption: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  workspaceOptionButton: {
    display: "flex",
    margin: 10,
    color: "white"
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceFlow);