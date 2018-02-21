import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Task from "./Task";

import Button from "material-ui/Button";

class TaskList extends Component {
  renderTasks = dropProvided => {
    const { taskOrder, taskData } = this.props;

    if (taskData === null) {
      return;
    }

    return (
      <div style={styles.container}>
        <div style={styles.dropZone} ref={dropProvided.innerRef}>
          {taskOrder.map((taskID, index) => (
            <Draggable key={taskID} draggableId={taskID} index={index} type={"TASK"}>
              {(dragProvided, dragSnapshot) => (
                <div>
                  <Task
                    key={taskID}
                    task={taskData[taskID]}
                    taskID={taskID}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                  />
                  {dragProvided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </div>
      </div>
    );
  };

  render() {
    const { columnID, tasks } = this.props;

    // const stringColumnID = columnID.toString();

    return (
      <Droppable droppableId={columnID} type={"TASK"}>
        {(dropProvided, dropSnapshot) => (
          <div style={styles.wrapper}>{this.renderTasks(dropProvided)}</div>
        )}
      </Droppable>
    );
  }
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    overflowY: "auto",
    width: "100%"
  },
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  dropZone: {
    minHeight: 250
  },
  addButton: {
    backgroundColor: "white"
  }
};

function mapStateToProps(state) {
  return {
    taskData: state.workflow.taskData
  };
}

export default connect(mapStateToProps, null)(TaskList);
