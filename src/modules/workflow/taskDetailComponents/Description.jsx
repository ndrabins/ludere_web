import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Input from "material-ui/Input";
import { FormControl } from "material-ui/Form";

class SubtaskList extends Component {
  state = {
    descriptionText: this.props.task.description
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBlur = () => {
    this.handleFieldEnter();
  };

  handleFieldEnter = () => {
    let updatedTask = this.props.task;

    if(this.props.task.description === this.state.descriptionText){
      return //nothing has changed so don't update
    }

    updatedTask.description = this.state.descriptionText;
    this.props.actions.updateTask(updatedTask);
  };

  render() {
    const { classes, description } = this.props;
    const { descriptionText } = this.state;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <Input
            className={classes.input}
            classes={{ focused: classes.inputFocused}}
            value={descriptionText}
            onChange={this.handleChange("descriptionText")}
            multiline
            fullWidth
            rowsMax="8"
            placeholder="Add a description"
            disableUnderline
            onBlur={() => this.handleBlur()}
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleFieldEnter();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    overflowY: "auto",
    marginBottom: 5
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    border: 'transparent 2px solid',
    transition: 'border .25s ease-out',
    '&:hover': {
      border: '#B0B2B6 2px solid',
    },
  },
  inputFocused:{
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    transition: 'border .25s ease-out',
    border: '2px solid #6d6d6d',
    '&:hover': {
      border: '2px solid #6d6d6d',
    },
  },
  formControl: {
    width: "100%"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(SubtaskList)
);
