import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Map from "lodash/map";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Chip from "@material-ui/core/Chip";

import FormControl from "@material-ui/core/FormControl";
import { TwitterPicker } from "react-color";

// const colorsAlt = [
//   "#6FE5C9",
//   "#E57373",
//   "#EE8D68",
//   "#F8FFAE",
//   "#00BCD4",
//   "#29B6F6",
//   "#796EFF",
//   "#CF8BF3",
//   "#A770EF"
// ];

const colors = [
  "#FF6900",
  "#FCB900",
  "#00D084",
  "#0693E3",
  "#EB144C",
  "#E57373",
  "#00BCD4",
  "#29B6F6",
  "#CF8BF3",
  "#A770EF"
];

class TagDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardID: PropTypes.string.isRequired
  };

  state = {
    open: false,
    tagName: "",
    tagColor: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clearChip = () => {
    this.setState({ tagName: "" });
  };

  handleColorPick = (color, event) => {
    this.setState({ tagColor: color.hex });
  };

  handleCreateTag = () => {
    const { actions, boardID } = this.props;
    const { tagName, tagColor } = this.state;
    actions.createTag(boardID, { tagName, tagColor });
    this.clearChip();
  };

  handleDeleteTag = tagID => {
    const { actions, boardID } = this.props;
    actions.deleteTag(boardID, tagID);
  };

  renderTags = () => {
    const { classes, tagsData } = this.props;

    const tags = Map(tagsData, (tag, tagID) => {
      return (
        <Chip
          key={tagID}
          style={{
            background: tag.color + "48",
            color: tag.color
          }}
          label={tag.name}
          onDelete={() => this.handleDeleteTag(tagID)}
          className={classes.chip}
        />
      );
    });

    return tags;
  };

  render() {
    const { classes } = this.props;
    const { tagName, open, tagColor } = this.state;
    return (
      <div className={classes.root}>
        <Button className={classes.button} onClick={this.handleClickOpen}>
          <FaTag className={classes.tagIcon} />
          Tags
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <div className={classes.dialogContent}>
            <div className={classes.row}>
              <Chip
                style={{
                  background: tagColor + "48",
                  color: tagColor
                }}
                label={tagName || "Tag"}
                onDelete={this.clearChip}
                className={classes.chip}
              />
              <Button variant="outlined" onClick={this.handleCreateTag}>
                Create Tag
              </Button>
            </div>
            <FormControl className={classes.formControl}>
              <Input
                value={tagName}
                onChange={this.handleChange("tagName")}
                autoFocus
                className={classes.input}
                placeholder="Create a tag here!"
                startAdornment={
                  <InputAdornment position="start">
                    <FaTag />
                  </InputAdornment>
                }
                onKeyPress={ev => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    ev.preventDefault();
                    this.handleCreateTag();
                  }
                }}
              />
            </FormControl>
            <TwitterPicker
              triangle="hide"
              color={tagColor}
              className={classes.colorPicker}
              colors={colors}
              onChangeComplete={this.handleColorPick}
            />
            <div className={classes.divider} />
            <div className={classes.tagsList}>{this.renderTags()}</div>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  dialogContent: {
    margin: 10
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tagIcon: {
    marginRight: 8
  },
  divider: {
    borderBottom: "2px solid #979797",
    marginBottom: 4
  },
  colorPicker: {
    boxShadow: "none !important",
    border: "none !important",
    justifyContent: "center",
    marginBottom: "0px !important"
  },
  formControl: {
    width: "100%",
    marginTop: 3,
    maxWidth: 500
  },
  chip: {
    width: "100%",
    margin: "2px",
    color: "rgba(255,255,255,0.75)",
    display: "flex",
    justifyContent: "space-between"
  },
  tagsList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  createdChip: {
    width: "100%",
    margin: "4px"
  }
});

function mapStateToProps(state) {
  return {
    tagsData: state.workflow.tagData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TagDialog));
