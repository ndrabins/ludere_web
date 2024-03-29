import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormControl from "@material-ui/core/FormControl";

class LudereInput extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    labelColor: PropTypes.string,
    helperText: PropTypes.string,
    handleChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    label: "",
    helperText: "",
    labelColor: "#303030",
    autoFocus: true
  };

  render() {
    const {
      classes,
      name,
      value,
      label,
      handleChange,
      helperText,
      labelColor,
      autoFocus,
      ...other
    } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel
          FormLabelClasses={{
            root: classes.label,
            focused: classes.cssFocused
          }}
          style={{ color: labelColor }}
          shrink={true}
        >
          {label}
        </InputLabel>
        <Input
          {...other}
          classes={{ focused: classes.inputFocused }}
          className={classes.input}
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
          fullWidth
          disableUnderline
          autoComplete="off"
        />
        {helperText !== "" && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

const styles = theme => ({
  formControl: {
    marginBotton: 10,
    width: "100%"
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "#303030",
    border: "1px solid #C3C3C3",
    overflow: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #C3C3C3"
    }
  },
  inputFocused: {
    border: "1px solid #303030",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #303030"
    }
  },
  label: {
    "&$cssFocused": {
      color: "#303030",
      fontWeight: "bold"
    },
    color: "#303030"
  },
  cssFocused: {}
});
export default withStyles(styles)(LudereInput);
