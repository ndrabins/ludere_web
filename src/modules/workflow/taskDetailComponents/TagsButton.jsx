import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TagIcon from "react-icons/lib/fa/tag";
import Popover from "@material-ui/core/Popover";
import { TextField } from "@material-ui/core";
import TagsList from "../taskDetailComponents/TagsList";
import { TwitterPicker } from "react-color";

const colors = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF"
];

class TagsButton extends Component {
  state = {
    anchorEl: null,
    colorPicker: "#FFF"
  };

  handleClick = event => {
    event.stopPropagation();
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

  handleChangeColor = color => {
    this.setState({ background: color.hex });
  };

  preventOpeningTaskDetail = event => {
    event.stopPropagation();
  };

  render() {
    const { classes, hovered, tagsData } = this.props;
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
                <TagsList tagsData={tagsData} />
                <TwitterPicker
                  triangle="hide"
                  colors={colors}
                  className={classes.colorPicker}
                />
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
    margin: 8,
    maxWidth: 400
  },
  colorPicker: {
    boxShadow: "none !important",
    border: "none !important"
  }
});
export default withStyles(styles)(TagsButton);
