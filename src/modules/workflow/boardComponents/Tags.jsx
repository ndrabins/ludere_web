import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TagIcon from "react-icons/lib/fa/tag";
import Typography from "@material-ui/core/Typography";

class Tags extends Component {
  state = {
    openTagDialog: false
  };
  onClick = event => {
    event.stopPropagation();
  };

  render() {
    const { classes, hovered } = this.props;

    return (
      <div className={classes.root}>
        {hovered && (
          <TagIcon onClick={this.onClick} className={classes.tagIcon} />
        )}
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
    fontColor: "#303030"
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    fontColor: "#303030"
  },
  tagIcon: {
    color: "#b9bbbe",
    marginRight: 4,
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  }
});
export default withStyles(styles)(Tags);
