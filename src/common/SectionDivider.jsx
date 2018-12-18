import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

class SectionDivider extends Component {
  render() {
    const { content, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.divider} />
        <Typography variant="subtitle1" className={classes.content}>
          {content}
        </Typography>
        <div className={classes.divider} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    fontColor: "#303030",
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    fontColor: "#303030",
  },
  divider: {
    display: "flex",
    height: 2,
    background: "#B9BBBE",
    width: "100%",
  },
});
export default withStyles(styles)(SectionDivider);
