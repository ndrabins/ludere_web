import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import BoardsIcon from "../../static/boards.svg";
import TagDialog from "./TagDialog";

class BoardHeader extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardName: PropTypes.string.isRequired,
    boardID: PropTypes.string.isRequired
  };

  render() {
    const { classes, boardName, boardID } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.headerContent}>
          <Typography variant="headline" className={classes.header}>
            <img src={BoardsIcon} className={classes.icon} alt="team icon" />
            {boardName}
          </Typography>
          <TagDialog boardID={boardID} />
        </div>
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
    margin: "0px 20px"
  },
  header: {
    margin: "8px 0px",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    filter: "invert(81%)", // turns white to #303030
    marginRight: 8
  },
  divider: {
    borderBottom: "2px solid #97979780"
  }
});
export default withStyles(styles)(BoardHeader);
