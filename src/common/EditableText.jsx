import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

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
    // make call if user clicks out of box
    this.props.handleEnterPress(this.state.value);
    this.setState({ renderEditableText: false });
  };

  handleFieldEnter = () => {
    this.props.handleEnterPress(this.state.value);
    this.handleBlur();
  };

  render() {
    const { classes, textStyle } = this.props;
    const { renderEditableText, value } = this.state;

    return (
      <div className={classes.container}>
        {renderEditableText ? (
          <FormControl className={classes.formControl}>
            <Input
              className={classes.input}
              value={this.state.value}
              onChange={this.handleChange("value")}
              multiline
              autoFocus
              fullWidth
              rowsMax="8"
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
        ) : (
          <div
            className={textStyle ? textStyle : classes.normalText}
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
    height: "100%",
    width: "100%"
  },
  normalText: {
    width: "100%",
    color: "white",
    display: "flex",
    overflowWrap: "break-word",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    backgroundColor: "transparent",
    padding: 5,
    opacity: 1,
    fontWeight: 600,
    border: "0px #000A solid",
    borderRadius: 5,
    minHeight: 14,
    textShadow: "1px 1px 1px rgba(0,0,0,0.24)",
    transition: "background-color 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      backgroundColor: "rgba(0,0,0,.15)  "
    }
  },
  input: {
    fontWeight: 500,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text"
  },
  formControl: {
    width: "100%"
  }
});

export default withStyles(styles)(EditableText);
