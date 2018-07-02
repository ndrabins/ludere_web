import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Filter from "lodash/filter";
import Circle from "react-circle";
import AssignUser from "./AssignUser";
import { withStyles } from "@material-ui/core/styles";
import TagsButton from "../taskDetailComponents/TagsButton";
import classnames from "classnames";
import TagsList from "../taskDetailComponents/TagsList";
import CommentIcon from "@material-ui/icons/Comment";

class Task extends PureComponent {
  state = {
    hovered: false
  };

  getSubtasksComplete = () => {
    const { subtasks } = this.props.task;
    const { classes } = this.props;
    const totalSubtasks = subtasks.length;
    const subtasksDone = Filter(subtasks, { completed: true }).length;

    let percentDone = ((subtasksDone / totalSubtasks) * 100).toFixed(0);
    if (totalSubtasks === 0) {
      return <div />;
    }

    if (totalSubtasks < 10) {
      return (
        <Typography variant="caption" className={classes.subtaskCounter}>
          {subtasksDone + "/" + totalSubtasks}
        </Typography>
      );
    } else {
      return (
        <Typography variant="caption" className={classes.percentageCounter}>
          {percentDone + "%"}
        </Typography>
      );
    }
  };

  getSubtaskCompletePercentage = () => {
    const { subtasks } = this.props.task;
    const totalSubtasks = subtasks.length;
    const subtasksDone = Filter(subtasks, { completed: true }).length;

    let percentDone = (subtasksDone / totalSubtasks) * 100;
    if (totalSubtasks === 0) {
      return 0;
    }

    return percentDone;
  };

  onMouseOver = () => {
    this.setState({ hovered: true });
  };

  onMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { task, taskID, classes, isDragging } = this.props;
    const { hovered } = this.state;

    if (task === undefined) {
      return <div />;
    }

    let percent = this.getSubtaskCompletePercentage();

    return (
      <Paper
        className={classnames(classes.container, {
          [classes.draggingContainer]: isDragging
        })}
        onClick={() => this.props.actions.toggleTaskDetail(taskID)}
        elevation={isDragging ? 20 : 1}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <Typography
          style={{
            display: "flex",
            wordWrap: "break-all",
            overflowWrap: "break-word"
          }}
        >
          {task.title}
        </Typography>
        <TagsList small tagKeys={task.tags} />
        <div className={classes.extraInfoContainer}>
          <div className={classes.taskItemContainer}>
            {task.subtasks.length > 0 && (
              <div className={classes.taskItemContainer}>
                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  size={30} // Number: Defines the size of the circle.
                  lineWidth={30} // Number: Defines the thickness of the circle's stroke.
                  progress={percent} // Number: Update to change the progress and percentage.
                  progressColor="#20BDD3" // String: Color of "progress" portion of circle.
                  bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                  textColor="#303030" // String: Color of percentage text color.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={false} // Boolean: Show/hide percentage.
                  showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                />
                {this.getSubtasksComplete()}
              </div>
            )}
            {task.numberOfComments > 0 && (
              <div className={classes.taskItemContainer}>
                <CommentIcon className={classes.commentIcon} />
                <Typography variant="caption">
                  {task.numberOfComments}
                </Typography>
              </div>
            )}
            <div />
          </div>
          <div className={classes.taskItemContainer}>
            <TagsButton hovered={hovered} task={task} taskID={taskID} />
            <AssignUser task={task} taskID={taskID} hovered={hovered} />
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = {
  container: {
    minHeight: 30,
    borderRadius: 8,
    border: "4px solid transparent",
    backgroundColor: "white",
    padding: 6,
    margin: "0 0 8px 0",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease-out, border 0.2s ease-out",
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    }
  },
  draggingContainer: {
    // backgroundColor: "black",
    borderRadius: 8,
    border: "4px solid #00BCD4",
    transition: "box-shadow 0.2s ease-out, border 0.2s ease-out"
  },
  progress: {
    display: "block",
    width: 24,
    height: 24
  },
  extraInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
    marginTop: 4
  },
  percentageCounter: {
    position: "absolute"
  },
  subtaskCounter: {
    position: "absolute"
  },
  commentIcon: {
    color: "#b9bbbe",
    width: 20,
    height: 20,
    marginLeft: 6
  },
  taskItemContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Task));
