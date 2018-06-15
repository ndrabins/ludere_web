import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Map from "lodash/map";

class TypingIndicator extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, usersTyping, userID } = this.props;

    let membersTyping = [];

    Map(usersTyping, (isTyping, memberID) => {
      if (isTyping && memberID !== userID) {
        membersTyping.push(memberID);
      }
    });

    let showIndicator = membersTyping.length > 0;

    return (
      <div className={showIndicator ? classes.root : classes.hidden}>
        <div className={classes.indicatorContainer}>
          <div className={classes.indicatorDot1} />
          <div className={classes.indicatorDot2} />
          <div className={classes.indicatorDot3} />
        </div>
        <Typography variant="caption"> Someone is typing </Typography>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#303030",
    padding: "5px",
    marginLeft: 20
  },
  hidden: {
    opacity: 0,
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    marginLeft: 20
  },
  indicatorContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8
  },
  indicatorDot1: {
    marginRight: 2,
    backgroundColor: "black",
    width: 6,
    height: 6,
    borderRadius: 5,
    opacity: 0.3,
    animation: "blink 2s ease-out 0s infinite"
  },
  indicatorDot2: {
    marginRight: 2,
    backgroundColor: "black",
    width: 6,
    height: 6,
    borderRadius: 5,
    opacity: 0.3,
    animation: "blink 2s ease-out .5s infinite"
  },
  indicatorDot3: {
    marginRight: 2,
    backgroundColor: "black",
    width: 6,
    height: 6,
    borderRadius: 5,
    opacity: 0.3,
    animation: "blink 2s ease-out 1s infinite"
  },
  "@keyframes blink": {
    "50%": {
      opacity: 0.8,
      transform: "translateY(-5px)"
    }
  }
});
export default withStyles(styles)(TypingIndicator);
