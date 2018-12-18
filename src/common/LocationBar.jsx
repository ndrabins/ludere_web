import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

class LocationBar extends Component {
  static defaultProps = {
    background: `somewhere mysterious`,
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
        <div className={classes.nameContainer}>
          <Typography variant="h6" className={classes.location}>
            {this.getLocation()}
          </Typography>
        </div>
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
    alignItems: "center",
  },
  nameContainer: {
    marginLeft: 15,
  },
  location: {
    color: "#303030",
  },
};

export default withStyles(styles)(LocationBar);
