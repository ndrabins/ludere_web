import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

const required = value => (value == null ? "Required" : undefined);

class CreateWorkspaceForm extends Component {
  state = {
    workspaceName: "",
    description: ""
  };

  handleCreateWorkspace = () => {
    if (this.state.workspaceName.length < 2) {
      return;
    }
    this.props.actions.createWorkspace(this.state.workspaceName);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3> CREATE A WORKSPACE </h3>
        <TextField
          autoComplete="false"
          autoFocus
          margin="dense"
          id="name"
          label="Workspace Name"
          fullWidth
          required
          value={this.state.workspaceName}
          onChange={this.handleChange("workspaceName")}
          autoComplete="false"
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.handleCreateWorkspace();
              ev.preventDefault();
            }
          }}
        />
        <div>
          <Button
            onClick={this.handleCreateWorkspace}
            variant="raised"
            color="primary"
            raised
            style={{ color: "white" }}
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  button: {
    // background: "linear-gradient(to left, #6fe5c9, #00bcd4)",
    color: "white",
    margin: 10
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

export default connect(null, mapDispatchToProps)(CreateWorkspaceForm);
