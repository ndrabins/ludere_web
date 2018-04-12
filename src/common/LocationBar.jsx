import React, { Component } from "react";
import { withStyles } from "material-ui/styles";

class LocationBar extends Component {
  static defaultProps = {
    background: `somewhere mysterious`
  };

  getLocation = () => {
    const { location } = this.props;
    let locationName;

    if (location.pathname.includes("workflow")) {
      locationName = "workflow";
    }

    return locationName;
  };

  render() {
    const { classes, locationName } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.nameContainer}>{this.getLocation()}</div>
      </div>
    );
  }
}

const styles = {
  root: {
    backgroundColor: "#FAFAFA",
    display: "flex",
    height: "48px",
    borderBottom: "1px solid #C3C3C3",
    alignItems: "center"
  },
  nameContainer: {
    marginLeft: 15
  }
};

export default withStyles(styles)(LocationBar);
