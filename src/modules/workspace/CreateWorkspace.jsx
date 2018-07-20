import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

import FormControl from "@material-ui/core/FormControl";

// const required = value => (value == null ? "Required" : undefined);

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
    const { handleSubmit, classes } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography className={classes.title}>Create Workspace</Typography>
        <div className={classes.dialogDividerContainer}>
          <div className={classes.dialogDividerColored} />
        </div>
        <Typography className={classes.fillerText} variant="caption">
          {`A workspace is a place for any type of organization, company or project to collaborate and communicate better.`}
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel
            FormLabelClasses={{
              root: classes.label,
              focused: classes.cssFocused
            }}
            shrink={true}
          >
            Workspace Name
          </InputLabel>
          <Input
            type="password"
            classes={{ focused: classes.inputFocused }}
            className={classes.input}
            value={this.state.workspaceName}
            onChange={this.handleChange("workspaceName")}
            fullWidth
            required
            autoComplete="off"
            autoFocus
            disableUnderline
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateWorkspace();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button
            onClick={this.handleCreateWorkspace}
            variant="raised"
            color="primary"
            className={classes.button}
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}
// linear-gradient(to left, #6fe5c9, #00bcd4)

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  button: {
    // background: "linear-gradient(to left, #6fe5c9, #00bcd4)",
    color: "white",
    margin: 10,
    background: "linear-gradient(to left, #6fe5c9, #00bcd4)",
    transition: "opacity 0.25s ease-out",
    "&:hover": {
      opacity: 0.9
    }
  },
  formControl: {
    marginBotton: 10
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "white",
    border: "1px solid #6D6D6D",
    overflow: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #C3C3C3"
    },
    marginBottom: 10
  },
  inputFocused: {
    border: "1px solid #FFF",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #FFF"
    }
  },
  fillerText: {
    color: "#C3C3C3",
    marginBottom: 20
  },
  label: {
    "&$cssFocused": {
      color: "#FFF",
      fontWeight: "bold"
    },
    color: "#FFF"
  },
  cssFocused: {},
  dialogDividerContainer: {
    width: "100%",
    marginBottom: 8,
    height: 4
  },
  dialogDividerColored: {
    background: "linear-gradient(to left, #6fe5c9, #00bcd4)",
    width: "40%",
    borderRadius: 5,
    marginBottom: 24,
    height: 4
  },
  title: {
    fontSize: 24,
    margin: "8px 0px",
    color: "white"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateWorkspaceForm));
