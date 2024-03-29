import React, { PureComponent } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Task from "./Task";

class TaskList extends PureComponent {
  render() {
    const { columnID } = this.props;
    const { taskOrder, taskData } = this.props;

    if (taskData == null) {
      return <div />;
    }

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
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={{
                          ...styles.taskContainer,
                          ...dragProvided.draggableProps.style
                        }}
                      >
                        <Task
                          key={taskID}
                          task={taskData[taskID]}
                          taskID={taskID}
                          isDragging={dragSnapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
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
    width: "100%",
    height: "100%",
    margin: 8
  },
  container: {
    // padding: 8,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  dropZone: {
    minHeight: 250,
    height: "100%"
  },
  addButton: {
    backgroundColor: "white"
  },
  taskContainer: {
    marginBottom: 8
  }
};

function mapStateToProps(state) {
  return {
    taskData: state.workflow.taskData
  };
}

export default connect(
  mapStateToProps,
  null
)(TaskList);
