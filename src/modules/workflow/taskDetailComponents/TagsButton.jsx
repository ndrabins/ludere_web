import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TagIcon from "react-icons/lib/fa/tag";
import Popover from "@material-ui/core/Popover";
import TagsList from "../taskDetailComponents/TagsList";
import { CirclePicker } from "react-color";
import Divider from "@material-ui/core/Divider";

const colors = [
  "#6FE5C9",
  "#E57373",
  "#EE8D68",
  "#F8FFAE",
  "#00BCD4",
  "#29B6F6",
  "#796EFF",
  "#CF8BF3",
  "#A770EF"
];

class TagsButton extends Component {
  state = {
    anchorEl: null,
    colorPicker: "#00BCD4",
    showColorPicker: false
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
    console.log(color.hex);
    this.setState({ colorPicker: color.hex });
  };

  preventOpeningTaskDetail = event => {
    event.stopPropagation();
  };

  render() {
    const { classes, hovered, tagsData } = this.props;
    const { anchorEl, showColorPicker, colorPicker } = this.state;

    return (
      <div className={classes.root}>
        <React.Fragment>
          {hovered && (
            <TagIcon onClick={this.handleClick} className={classes.tagIcon} />
          )}
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
              {/* {showColorPicker && ( */}
              <CirclePicker
                colors={colors}
                color={colorPicker}
                className={classes.colorPicker}
                width={150}
              />
              {/* )} */}
              <Divider />
              <TagsList tagsData={tagsData} column />
            </div>
          </Popover>
        </React.Fragment>
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
    border: "none !important",
    justifyContent: "center",
    marginBottom: "0px !important"
  }
});
export default withStyles(styles)(TagsButton);
