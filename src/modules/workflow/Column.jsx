import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import TaskList from "./TaskList";
import EditableText from "../../common/EditableText";

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
    let newList = this.props.list;
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
    if (list === undefined || list.name === undefined) {
      return <div />;
    }

    return (
      <Draggable draggableId={ID} type="COLUMN" index={this.props.index}>
        {(provided, snapshot) => (
          <div style={styles.wrapper}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...styles.container, ...provided.draggableProps.style }}
            >
              <div style={styles.title}>
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
    height: "100%"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "95%"
  },
  title: {
    minHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#FFFFFF",
    display: "flex",
    backgroundColor: "#00BCD4",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    color: "white"
  },
  taskEntry: {
    paddingLeft: 10,
    paddingRight: 10,
  },
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Column));
