import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

class EditableText extends Component {
  state = {
    value: this.props.value,
    renderEditableText: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleTextClick = () => {
    this.setState({ renderEditableText: true });
  };

  handleBlur = () => {
    this.setState({ renderEditableText: false });
  };

  handleFieldEnter = () => {
    console.log("value inside edit", this.state.value);
    this.props.handleEnterPress(this.state.value);
    this.handleBlur();
  };

  render() {
    const { classes } = this.props;
    const { renderEditableText, value } = this.state;

    return (
      <div className={classes.container}>
        {renderEditableText ? (
          <TextField
            value={this.state.value}
            onChange={this.handleChange("value")}
            multiline
            autoFocus
            rowsMax="4"
            onBlur={() => this.handleBlur()}
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
                this.handleFieldEnter();
                ev.preventDefault();
              }
            }}
          />
        ) : (
          <div
            className={classes.normalText}
            onClick={() => this.handleTextClick()}
          >
            {value}
          </div>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    height: "100%"
  },
  textFieldRoot: {
    padding: 0
  },
  normalText: {
    color: "white",
    display: "flex",
    wordWrap: "break-all",
    overflowWrap: "break-word",
    wordBreak: "break-all",
    minWidth: 120,
    minHeight: 14,
    "&:hover": {
      cursor: "text",
      opacity: 0.5,
      backgroundColor: "#303030",
      border: "1px solid #303030",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: "transparent",
    color: "white",
    fontSize: 16,
    padding: "6px 8px",
    width: "calc(100% - 24px)",
    overflowY: "hidden",
    overflowX: "hidden",
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
