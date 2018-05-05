import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import Filter from "lodash/filter";
import CommentIcon from "material-ui-icons/ModeComment";
import Circle from "react-circle";

class Task extends Component {
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
    const { task, taskID } = this.props;
    const { subtaskPercentageDone } = this.state;

    if (task === undefined) {
      return <div />;
    }

    let percent = this.getSubtaskCompletePercentage();

    return (
      <div
        style={styles.container}
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
