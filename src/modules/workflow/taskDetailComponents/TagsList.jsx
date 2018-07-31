import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Map from "lodash/map";
import classnames from "classnames";

class TagsList extends PureComponent {
  state = {
    openTagDialog: false
  };

  onClick = event => {
    event.stopPropagation();
  };

  handleDelete = data => {
    console.log("deleting");
  };

  renderTags = () => {
    const { classes, small, tagKeys, tagsData } = this.props;

    const tags = Map(tagKeys, (isTagOnTask, tagID) => {
      if (!isTagOnTask || !tagsData[tagID]) {
        return;
      }

      if (small) {
        return (
          <div
            key={tagID}
            className={classes.tag}
            style={{
              background: tagsData[tagID].color + "48",
              color: tagsData[tagID].color
            }}
          >
            {tagsData[tagID].name}
          </div>
        );
      } else {
        return (
          <Chip
            key={tagID}
            label={tagsData[tagID].name}
            onDelete={() => this.handleDelete("something")}
            className={classes.chipTag}
            style={{ backgroundColor: tagsData[tagID].color }}
          />
        );
      }
    });

    return tags;
  };

  render() {
    const { classes, column } = this.props;

    return (
      <div
        className={classnames(classes.root, {
          [classes.column]: column
        })}
      >
        {this.renderTags()}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    fontColor: "#303030",
    flexWrap: "wrap",
    textOverflow: "ellipsis"
  },
  column: {
    flexDirection: "column"
  },
  chipTag: {
    margin: 5,
    color: "rgba(255,255,255,0.75)"
  },
  tag: {
    height: "18px",
    minWidth: "50px",
    borderRadius: "13.5px",
    boxShadow: "0 9px 18px 0 rgba(0,0,0,0.04), 0 5.5px 5px 0 rgba(0,0,0,0.02)",
    display: "flex",
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(255,255,255,0.75)",
    fontSize: 12
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
)(withStyles(styles)(TagsList));
