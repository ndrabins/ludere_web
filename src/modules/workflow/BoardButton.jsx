import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withRouter } from "react-router";

import { withStyles } from "material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "material-ui/Typography";
import Menu, { MenuItem } from "material-ui/Menu";
import Input from "material-ui/Input";

import { Link } from "react-router-dom";

class BoardButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isEditingBoardName: false,
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

  handleBoardDelete = (event, boardID) => {
    console.log("deleting board", boardID);
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleFieldEnter = () => {
    const { boardName } = this.state;
    const { actions, boardID } = this.props;
    actions.updateBoard({ boardName: boardName }, boardID);
    this.setState({ isEditingBoardName: false });
  };

  render() {
    const { history, boardID, selectedBoard, classes, name } = this.props;
    const { anchorEl, isEditingBoardName, boardName } = this.state;

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
        {isEditingBoardName ? (
          <Input
            className={classes.input}
            value={boardName}
            onChange={this.handleChange("boardName")}
            autoFocus
            fullWidth
            disableUnderline
            onKeyPress={ev => {
              if (ev.key === "Enter") {
                this.handleFieldEnter();
                ev.preventDefault();
              }
            }}
          />
        ) : (
          <Typography
            className={nameStyle}
            onClick={this.handleClick}
            noWrap
            component={Link}
            to="/team/workflow"
          >
            {name}
          </Typography>
        )}
        <MoreVertIcon
          className={classes.icon}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={ev => this.handleMenuClick(ev)}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleUpdateBoardName}>Edit Name</MenuItem>
          <MenuItem onClick={ev => this.handleBoardDelete(ev, boardID)}>
            Delete Board
          </MenuItem>
        </Menu>
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
    marginBottom: 1,
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
    marginBottom: 1,
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
