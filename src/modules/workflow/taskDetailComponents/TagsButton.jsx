import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import TagIcon from "react-icons/lib/fa/tag";
import Popover from "@material-ui/core/Popover";
import Map from "lodash/map";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

class TagsButton extends Component {
  state = {
    anchorEl: null
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

  toggleTagFromTask = tagID => {
    const { actions, task, taskID } = this.props;
    let isTagOnTask = task.tags[tagID];
    let updatedTask = { ...task };
    updatedTask.tags[tagID] = !isTagOnTask; //toggles assigning user
    actions.updateTask(updatedTask, taskID);
  };

  preventOpeningTaskDetail = event => {
    event.stopPropagation();
  };

  renderTags = () => {
    const { classes, tagsData, task } = this.props;

    if (Object.keys(tagsData).length === 0) {
      return <div> Try creating some tags first! </div>;
    }

    const tags = Map(tagsData, (tag, tagID) => {
      if (task.tags[tagID]) {
        return (
          <Chip
            key={tagID}
            style={{ background: tag.color }}
            label={tag.name}
            onDelete={() => this.toggleTagFromTask(tagID)}
            className={classes.chip}
          />
        );
      } else {
        return (
          <Chip
            key={tagID}
            style={{ background: tag.color }}
            label={tag.name}
            onDelete={() => this.toggleTagFromTask(tagID)}
            className={classes.chip}
            deleteIcon={<DoneIcon />}
          />
        );
      }
    });

    return tags;
  };

  render() {
    const { classes, hovered } = this.props;
    const { anchorEl } = this.state;

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
              {this.renderTags()}
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
    maxWidth: 400,
    display: "flex",
    flexDirection: "column"
  },
  colorPicker: {
    boxShadow: "none !important",
    border: "none !important",
    justifyContent: "center",
    marginBottom: "0px !important"
  },
  chip: {
    width: "100%",
    margin: "2px",
    color: "rgba(255,255,255,0.75)",
    display: "flex",
    justifyContent: "space-between"
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TagsButton)
);
