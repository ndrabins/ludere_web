import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Task from "./Task";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

class TaskList extends Component {
  state = {
    taskName: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  createTask = () => {
    if (this.state.taskName === "") {
      return;
    }
    this.props.actions.createTask(this.props.columnID, this.state.taskName);

    this.setState({
      taskName: ""
    });
  };

  renderTasks = dropProvided => {
    const { tasks } = this.props;

    if (tasks === undefined) {
      return;
    }

    return (
      <div style={styles.container}>
        <div style={styles.dropZone} ref={dropProvided.innerRef}>
          {tasks.map(task => (
            <Draggable key={task.id} draggableId={task.id} type={"Task"}>
              {(dragProvided, dragSnapshot) => (
                <div>
                  <Task
                    key={task.id}
                    task={task}
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
          <div style={styles.wrapper}>
            {this.renderTasks(dropProvided)}
            <TextField
              id="taskName"
              placeholder="Create a card"
              value={this.state.taskName}
              onChange={this.handleChange("taskName")}
              margin="normal"
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.createTask();
                  ev.preventDefault();
                }
              }}
            />
          </div>
        )}
      </Droppable>
    );
  }
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  dropZone: {
    minHeight: 250,
    marginBottom: 8
  },
  addButton: {
    backgroundColor: "white"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TaskList);
