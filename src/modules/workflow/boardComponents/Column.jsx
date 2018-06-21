import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import { withStyles } from "@material-ui/core/styles";

import { Droppable, Draggable } from "react-beautiful-dnd";

import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TaskList from "./TaskList";
import EditableText from "../../../common/EditableText";

class Column extends PureComponent {
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

  handleListDelete = columnID => {
    const { boardID, actions } = this.props;
    actions.deleteList(columnID, boardID);
    this.handleClose();
  };

  render() {
    const { list, ID, classes } = this.props;
    const { anchorEl } = this.state;

    if (list === undefined) {
      return <div />;
    }

    return (
      <Draggable draggableId={ID} type="COLUMN" index={this.props.index}>
        {(provided, snapshot) => (
          <div style={styles.wrapper}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={classes.container}
              style={{ ...provided.draggableProps.style }}
            >
              <div className={classes.title} {...provided.dragHandleProps}>
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
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <MenuItem onClick={() => this.handleListDelete(ID)}>
                    <ListItemIcon className={classes.icon}>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete List" />
                  </MenuItem>
                </Popover>
              </div>
              <div className={classes.taskEntry}>
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
              <div className={classes.tasksContainer}>
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
    width: 240,
    backgroundColor: "#E5E5E6",
    margin: 6,
    borderRadius: 7,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)"
  },
  tasksContainer: {
    display: "flex",
    height: "100%"
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
