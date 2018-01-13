import React, { Component } from "react";
import Typography from "material-ui/Typography";

class Task extends Component {
  render() {
    const { task, isDragging, provided } = this.props;

    if (task === undefined) {
      return <div />;
    }

    return (
      <div
        ref={provided.innerRef}
        style={{ ...styles.container, ...provided.draggableStyle }}
        {...provided.dragHandleProps}
      >
        <Typography
          style={{
            display: "flex",
            wordWrap: "break-all",
            overflowWrap: "break-word",
            wordBreak: "break-all"
          }}
        >
          {task.title}
        </Typography>
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
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10, 
    margin: `0 0 8px 0`,
    display: "flex"
  }
};

export default Task;
