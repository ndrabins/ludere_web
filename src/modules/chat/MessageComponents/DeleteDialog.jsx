import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";

class DeleteDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.headerContent}>{this.props.children}</div>
        <div className={classes.divider} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    color: "#303030"
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 20px",
    padding: "8px 0px"
  },
  header: {
    margin: "8px 0px"
  },
  divider: {
    borderBottom: "2px solid #97979780"
  },
  tagIcon: {
    marginRight: 8
  }
});
export default withStyles(styles)(DeleteDialog);
