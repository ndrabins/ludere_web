import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Dialog from "common/Dialog";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

class BoardButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isEditingBoardName: false,
      isDeletingBoard: false,
      boardName: this.props.name
    };
  }

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  handleUpdateBoardName = () => {
    this.setState({ isEditingBoardName: true });
    this.handleClose();
  };

  handleBoardDeleteConfirmation = (event, boardID) => {
    const { actions } = this.props;
    actions.deleteBoard(boardID);
    this.handleClose();
  };

  handleBoardDelete = () => {
    this.setState({ isDeletingBoard: true });
    this.handleClose();
  };

  handleClick = () => {
    this.props.actions.selectBoard(this.props.boardID);
  };

  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseDialog = () => {
    this.setState({ isDeletingBoard: false, isEditingBoardName: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleUpdateBoardConfirmation = () => {
    const { boardName } = this.state;
    const { actions, boardID } = this.props;
    actions.updateBoard({ boardName: boardName }, boardID);
    this.setState({ isEditingBoardName: false });
  };

  render() {
    const { history, boardID, selectedBoard, classes, name } = this.props;
    const {
      anchorEl,
      isEditingBoardName,
      boardName,
      isDeletingBoard
    } = this.state;

    let workflowStyle = classes.workflow;
    let nameStyle = classes.name;
    if (
      boardID === selectedBoard &&
      history.location.pathname.includes("workflow")
    ) {
      workflowStyle = classes.selectedWorkflow;
      nameStyle = classes.selectedName;
    }

    return (
      <div className={workflowStyle}>
        <Typography
          className={nameStyle}
          onClick={this.handleClick}
          noWrap
          component={Link}
          to="/team/workflow"
        >
          {name}
        </Typography>

        <MoreVertIcon
          className={classes.icon}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={ev => this.handleMenuClick(ev)}
        />
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
          <MenuItem onClick={this.handleUpdateBoardName}>
            <ListItemIcon className={classes.icon}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Name" />
          </MenuItem>
          <MenuItem onClick={this.handleBoardDelete}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Workflow" />
          </MenuItem>
        </Popover>
        <Dialog
          handleAction={this.handleUpdateBoardConfirmation}
          open={isEditingBoardName}
          handleClose={this.handleCloseDialog}
          titleName="Edit workflow name"
          actionButtonName="Confirm"
          color="linear-gradient(to right, rgb(167, 112, 239), rgb(207, 139, 243))"
          helperText=""
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workflow Name"
            fullWidth
            autoComplete="off"
            value={boardName}
            onChange={this.handleChange("boardName")}
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleUpdateBoardConfirmation();
                ev.preventDefault();
              }
            }}
          />
        </Dialog>
        <Dialog
          handleAction={this.handleBoardDeleteConfirmation}
          open={isDeletingBoard}
          handleClose={this.handleCloseDialog}
          titleName="Delete workflow"
          actionButtonName="Delete"
          color="rgb(229, 115, 115)"
          helperText="Warning: this will delete all tasks in this workflow"
        />
      </div>
    );
  }
}

const styles = {
  workflow: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    height: 28,
    fontSize: "14px",
    transition: "background-color 0.25s ease-out",
    borderRadius: 5,
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  selectedWorkflow: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    height: 28,
    fontSize: "14px",
    backgroundColor: "#616161",
    borderRadius: 5,
    transition: "background-color 0.25s ease-out",
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  name: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52,
    transition: "color 0.25s ease-out",
    color: "#6f6f6f",
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer"
    }
  },
  selectedName: {
    textDecoration: "none",
    color: "#FFFFFF",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52
  },
  icon: {
    color: "#6f6f6f",
    marginTop: 2,
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer"
    }
  },
  input: {
    fontWeight: 500,
    marginLeft: 50,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "hidden",
    overflowX: "hidden",
    cursor: "text"
  }
};

function mapStateToProps(state) {
  return {
    selectedBoard: state.workflow.selectedBoard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(BoardButton))
);
