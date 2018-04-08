import React, { Component } from "react";
import { withStyles } from "material-ui/styles";

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>UNDER CONSTRUCTION</div>;
  }
}

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
};

export default withStyles(styles)(Dashboard);
