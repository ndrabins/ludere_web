import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import TaskList from "./TaskList";

class Column extends Component {
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
    this.props.actions.createTask(this.props.ID, this.state.taskName);

    this.setState({
      taskName: ""
    });
  };

  render() {
    const { list, ID } = this.props;
    if (list === undefined || list.name === undefined) {
      return <div />;
    }

    return (
      <Draggable draggableId={ID} type="COLUMN">
        {(provided, snapshot) => (
          <div style={styles.wrapper}>
            <div
              ref={provided.innerRef}
              style={{ ...styles.container, ...provided.draggableStyle }}
            >
              <div {...provided.dragHandleProps} style={styles.title}>
                {list.name}
              </div>
              <div style={styles.tasksContainer}>
                <TaskList columnID={ID} taskOrder={list.taskOrder} />
              </div>
              <div>
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
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
    width: 200,
    backgroundColor: "#E5E5E6",
    margin: 6,
    borderRadius: 7,
    maxHeight: "100%"
  },
  tasksContainer: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "95%"
  },
  title: {
    minHeight: 20,
    padding: 8,
    color: "#FFFFFF",
    display: "flex",
    backgroundColor: "#00BCD4",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Column);
