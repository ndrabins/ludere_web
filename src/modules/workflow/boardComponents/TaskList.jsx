import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";

import Task from "./Task";

import Button from "material-ui/Button";

class TaskList extends Component {
  render() {
    const { columnID, tasks } = this.props;
    const { taskOrder, taskData } = this.props;

    if (taskData === null) {
      return <div />;
    }

    // const stringColumnID = columnID.toString();

    return (
      <Droppable droppableId={columnID} type={"TASK"}>
        {(dropProvided, dropSnapshot) => (
          <div
            style={styles.wrapper}
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
          >
            <div style={styles.container}>
              <div style={styles.dropZone}>
                {taskOrder.map((taskID, index) => (
                  <Draggable
                    key={taskID}
                    draggableId={taskID}
                    index={index}
                    type={"TASK"}
                  >
                    {(dragProvided, dragSnapshot) => (
                      <div ref={dragProvided.innerRef} style={{marginBottom:8}}>
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
          </div>
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
    padding: 8,
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
