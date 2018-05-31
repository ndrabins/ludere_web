import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TagIcon from "react-icons/lib/fa/tag";
import Popover from "@material-ui/core/Popover";
import { TextField } from "@material-ui/core";

class TagsButton extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    event.stopPropagation();
    console.log("something");
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({
      anchorEl: null
    });
  };

  preventOpeningTaskDetail = event => {
    event.stopPropagation();
  };

  render() {
    const { classes, hovered } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        {hovered && (
          <React.Fragment>
            <TagIcon onClick={this.handleClick} className={classes.tagIcon} />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <div
                className={classes.tagModal}
                onClick={this.preventOpeningTaskDetail}
              >
                something
              </div>
            </Popover>
          </React.Fragment>
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
  tagIcon: {
    color: "#b9bbbe",
    marginRight: 4,
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  },
  tagModal: {
    margin: 10
  }
});
export default withStyles(styles)(TagsButton);
