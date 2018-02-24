import React, { Component } from 'react';
import { withStyles } from "material-ui/styles";


class SelectableTextButton extends Component {
  render() {
    const {classes, isSelectable, isSelected} = this.props;
    let buttonStyle;

    if(isSelected){
      buttonStyle = classes.selected;
    }
    else if(isSelectable){
      buttonStyle = classes.baseWithHover;
    }
    else {
      buttonStyle = classes.base;
    }

    return (
      <div className={buttonStyle}>
        selectable
      </div>
    );
  }
}

const styles = {
  base:{
    textDecoration: "none",
    color: "#6f6f6f",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50,
    borderRadius: 5,
  },
  baseWithHover:{
    textDecoration: "none",
    color: "#6f6f6f",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#424242",
      color: "#b9bbbe",
      cursor: "pointer"
    }
  },
  selected:{
    textDecoration: "none",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50,
    color: "#FFFFFF",
    backgroundColor: "#616161",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#424242",
      color: "#b9bbbe",
      cursor: "pointer"
    }
  }
}

export default withStyles(styles)(SelectableTextButton);
