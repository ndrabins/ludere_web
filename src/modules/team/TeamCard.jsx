import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class TeamCard extends Component {
  static defaultProps = {
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
  };

  render() {
    const { classes, title, background } = this.props;
    return (
      <Paper className={classes.paperContainer} elevation={4}>
        <Paper
          style={{ ...inlineStyles.heading, background: background }}
          elevation={2}
        >
          <Typography className={classes.title} variant="headline">
            {title}
          </Typography>
        </Paper>
        <div className={classes.root}>{this.props.children}</div>
      </Paper>
    );
  }
}

const inlineStyles = {
  heading: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 40px)",
    margin: "-15px 0px 10px 20px",
    borderRadius: 7,
    padding: "5px 5px"
    // boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.12)"
  }
};

const styles = theme => ({
  root: {
    display: "flex",
    overflowY: "auto"
  },
  title: {
    color: "#fff",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 10,
    fontWeight: 600,
    fontSize: 16,
    textShadow: "1px 1px 1px rgba(0,0,0,0.4)"
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    marginTop: 20,
    flex: 1
  }
});

export default withStyles(styles)(TeamCard);
