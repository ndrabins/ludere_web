import React, { Component } from "react";

class Task extends Component {
  render() {
    const { task, isDragging, provided } = this.props;

    return (
      <div
        ref={provided.innerRef}
        style={{ ...styles.container, ...provided.draggableStyle }}
        {...provided.dragHandleProps}
      >
        <div> {task.content} </div>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: 40,
    cursor: "grab",
    border: "1px solid grey",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginTop: 4,
    marginBottom: 4
  },
  content: {}
};

export default Task;
