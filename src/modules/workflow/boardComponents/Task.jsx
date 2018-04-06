import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import Filter from "lodash/filter";
import CommentIcon from "material-ui-icons/ModeComment";

class Task extends PureComponent {
  state = {
    subtaskPercentageDone: 0
  };

  getSubtaskCompletePercentage = () => {
    const { subtasks } = this.props.task;
    const totalSubtasks = subtasks.length;
    const subtasksDone = Filter(subtasks, { completed: true }).length;

    let percentDone = subtasksDone / totalSubtasks * 100;
    if (totalSubtasks === 0) {
      return 0;
    }

    return percentDone;
  };

  render() {
    const { task, isDragging, provided, taskID } = this.props;
    const { subtaskPercentageDone } = this.state;

    if (task === undefined) {
      return <div />;
    }

    let percent = this.getSubtaskCompletePercentage();

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{ ...styles.container, ...provided.draggableProps.style }}
        onClick={() => this.props.actions.toggleTaskDetail(taskID)}
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
        {task.subtasks.length > 0 && (
          <div style={styles.extraInfoContainer}>
            <CircularProgress
              style={styles.progress}
              variant="static"
              value={percent}
            />
            <Typography variant="caption" style={styles.subtasksCounter}>
              {Filter(task.subtasks, { completed: true }).length}/
              {task.subtasks.length}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: 30,
    cursor: "grab",
    boxShadow: "0 9px 18px 0 rgba(0, 0, 0, 0.04)",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    margin: "0 0 8px 0",
    cursor: "pointer"
  },
  progress: {
    display: "block",
    width: 24,
    height: 24
  },
  extraInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  subtasksCounter: {
    paddingLeft: 3
  },
  commentIcon: {
    color: "#6d6d6d",
    width: 20,
    height: 20,
    marginLeft: 10
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Task);
