import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "material-ui/styles";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

import TaskList from "./TaskList";
import EditableText from "../../../common/EditableText";

class Column extends Component {
  state = {
    taskName: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleTitleChange = name => {
    let newList = { ...this.props.list };
    newList.name = name;

    this.props.actions.updateList(newList, this.props.ID);
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
    const { list, ID, classes } = this.props;

    return (
      <Draggable draggableId={ID} type="COLUMN" index={this.props.index}>
        {(provided, snapshot) => (
          <div style={styles.wrapper}>
            <div
              elevation={4}
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={{ ...styles.container, ...provided.draggableProps.style }}
            >
              <div style={styles.title} {...provided.dragHandleProps}>
                <EditableText
                  value={list.name}
                  handleEnterPress={this.handleTitleChange}
                />
              </div>
              <div style={styles.tasksContainer}>
                <TaskList columnID={ID} taskOrder={list.taskOrder} />
              </div>
              <div style={styles.taskEntry}>
                <TextField
                  id="taskName"
                  placeholder="Create a task"
                  className={classes.textField}
                  value={this.state.taskName}
                  fullWidth
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
    width: 240,
    backgroundColor: "#E5E5E6",
    margin: 6,
    borderRadius: 7
  },
  tasksContainer: {
    display: "flex"
  },
  wrapper: {
    // display: "flex",
    // flexDirection: "column"
  },
  title: {
    minHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#FFFFFF",
    display: "flex",
    background: "linear-gradient(to right, #00BCD4, #26d0ce)",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    color: "white"
  },
  taskEntry: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

// function mapStateToProps(state) {
//   return {
//     listData: state.workflow.listData
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Column));
