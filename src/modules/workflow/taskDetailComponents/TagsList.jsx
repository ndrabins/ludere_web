import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Map from "lodash/map";

class TagsList extends Component {
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
    const { classes, small, tagsData } = this.props;

    const tags = Map(tagsData, (tag, key) => {
      if (small) {
        return (
          <div
            key={key}
            className={classes.tag}
            style={{ backgroundColor: tag.color }}
          >
            {tag.name}
          </div>
        );
      } else {
        return (
          <Chip
            key={key}
            label={tag.name}
            onDelete={() => this.handleDelete("something")}
            className={classes.chipTag}
            style={{ backgroundColor: tag.color }}
          />
        );
      }
    });

    return tags;
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderTags()}</div>;
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    fontColor: "#303030",
    flexWrap: "wrap",
    textOverflow: "ellipsis"
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
export default withStyles(styles)(TagsList);
