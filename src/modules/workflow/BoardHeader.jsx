import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import TagIcon from "react-icons/lib/fa/tag";
import Button from "@material-ui/core/Button";
import BoardsIcon from "../../static/boards.svg";

class BoardHeader extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardName: PropTypes.string.isRequired
  };

  render() {
    const { classes, boardName } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.headerContent}>
          <Typography variant="headline" className={classes.header}>
            <img src={BoardsIcon} className={classes.icon} alt="team icon" />
            {boardName}
          </Typography>
          <Button className={classes.button}>
            <TagIcon className={classes.tagIcon} />
            Tags
          </Button>
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
    filter: "invert(100%)",
    marginRight: 8
  },
  divider: {
    borderBottom: "2px solid #97979780"
  },
  tagIcon: {
    marginRight: 8
  }
});
export default withStyles(styles)(BoardHeader);
