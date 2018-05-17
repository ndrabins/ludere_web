import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "@material-ui/core/styles";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Menu, { MenuItem } from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import TaskList from "./TaskList";
import EditableText from "../../../common/EditableText";

class Column extends Component {
  state = {
    taskName: "",
    anchorEl: null
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

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleColumnDelete = columnID => {
    const { selectedTeam } = this.props;
    console.log("deleting..");
    console.log(columnID);
    // this.props.actions.removeFromTeam(selectedTeam, columnID);
    this.handleClose();
  };

  render() {
    const { list, ID, classes } = this.props;
    const { anchorEl } = this.state;

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
                <IconButton
                  aria-owns={anchorEl ? "simple-menu" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleColumnDelete(ID)}>
                    Delete Column
                  </MenuItem>
                </Menu>
              </div>
              <div style={styles.taskEntry}>
                <TextField
                  id="taskName"
                  placeholder="Create a task"
                  className={classes.textField}
                  value={this.state.taskName}
                  fullWidth
                  multiline
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
              <div style={styles.tasksContainer}>
                <TaskList columnID={ID} taskOrder={list.taskOrder} />
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
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
    color: "#FFFFFF",
    display: "flex",
    background: "linear-gradient(to right, #00BCD4, #26d0ce)",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
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
