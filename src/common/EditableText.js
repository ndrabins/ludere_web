import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

class EditableText extends Component {
  state = {
    value: this.props.value
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          value={this.state.value}
          onChange={this.handleChange("value")}
          multiline
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput
            }
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel
          }}
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.props.handleEnterPress(this.state.value);
              ev.preventDefault();
            }
          }}
        />
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    height: "100%",
    padding: 8
  },
  textFieldRoot: {
    padding: 0
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: "transparent",
    color: "white",
    fontSize: 16,
    padding: "6px 8px",
    width: "calc(100% - 24px)",
    overflowY: "hidden",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      color: "black",
      backgroundColor: "#FFF",
      border: "1px solid #ced4da",
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  textFieldFormLabel: {
    fontSize: 18
  }
});

export default withStyles(styles)(EditableText);
