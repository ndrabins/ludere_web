import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorSVG from "static/svg/error.svg";
import { Typography } from "@material-ui/core";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, info);
  // }

  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      return (
        <div className={classes.container}>
          <img src={ErrorSVG} className={classes.icon} alt="team icon" />
          <Typography variant="h4">
            Uh oh, sorry something went wrong.
          </Typography>
          <Typography variant="subtitle2">
            We've logged the error and will be looking into it ASAP.
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200,
  },
});
export default withStyles(styles)(ErrorBoundary);
