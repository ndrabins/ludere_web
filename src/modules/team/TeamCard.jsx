import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

class TeamCard extends Component {
  static defaultProps = {
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`,
    headerAction: <span />,
    headerFunction: () => {},
    showActionIcon: false,
    floatingIcon: <span />,
    floatingAction: () => {},
    showFloating: false,
  };

  render() {
    const {
      classes,
      title,
      background,
      headerAction,
      showActionIcon,
      headerFunction,
      floatingIcon,
      floatingAction,
      showFloating,
    } = this.props;
    return (
      <Paper className={classes.paperContainer} elevation={4}>
        <Paper
          style={{ ...inlineStyles.heading, background: background }}
          elevation={2}
        >
          <Typography className={classes.title} variant="h5">
            {title}
          </Typography>
          {showActionIcon && (
            <IconButton onClick={headerFunction}>{headerAction}</IconButton>
          )}
        </Paper>
        <div className={classes.root}>{this.props.children}</div>
        {showFloating && (
          <Button
            variant="fab"
            color="secondary"
            aria-label="edit"
            onClick={floatingAction}
            className={classes.floatingButton}
            style={{ background: background }}
          >
            {floatingIcon}
          </Button>
        )}
      </Paper>
    );
  }
}

const inlineStyles = {
  heading: {
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 40px)",
    margin: "-15px 0px -25px 20px",
    borderRadius: 7,
    padding: "5px 5px",
    zIndex: 10,
    justifyContent: "space-between",
  },
};

const styles = theme => ({
  root: {
    overflowY: "auto",
    paddingTop: "25px",
    height: "100%",
  },
  title: {
    color: "#fff",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 10,
    fontWeight: 600,
    fontSize: 16,
    textShadow: "1px 1px 1px rgba(0,0,0,0.24)",
  },
  paperContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    margin: 10,
    marginTop: 20,
    flex: 1,
  },
  floatingButton: {
    right: 20,
    bottom: 20,
    position: "absolute",
    color: "white",
  },
});

export default withStyles(styles)(TeamCard);
