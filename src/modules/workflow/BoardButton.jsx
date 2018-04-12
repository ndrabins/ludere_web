import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withRouter } from "react-router";

import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Avatar from "material-ui/Avatar";

import { Link } from "react-router-dom";

class BoardButton extends Component {
  state = {
    anchorEl: null,
    openNavMenu: false,
    isHovered: false
  };

  handleClickNavMenu = event => {
    this.setState({ openNavMenu: true, anchorEl: event.currentTarget });
  };

  handleRequestCloseNavMenu = () => {
    this.setState({ openNavMenu: false });
  };

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  handleClick = () => {
    this.props.actions.selectBoard(this.props.boardID);
  };

  render() {
    const { location } = this.props;
    let workflowStyle = styles.workflow;
    let nameStyle = styles.name;
    if (this.state.isHovered) {
      workflowStyle = styles.hoveredWorkflow;
      nameStyle = styles.hoveredName;
    }
    if (
      this.props.boardID === this.props.selectedBoard &&
      location.pathname.includes("workflow")
    ) {
      workflowStyle = styles.selectedWorkflow;
      nameStyle = styles.selectedName;
    }

    return (
      <div
        style={workflowStyle}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <Link style={nameStyle} onClick={this.handleClick} to="/team/workflow">
          {this.props.name}
        </Link>
        <IconButton
          style={{
            color: nameStyle.color,
            height: "100%",
            width: 34
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    );
  }
}

const baseStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  marginLeft: 8,
  marginRight: 4,
  marginBottom: 1,
  height: 28,
  fontSize: "14px"
};

const baseName = {
  textDecoration: "none",
  color: "#6f6f6f",
  display: "flex",
  width: "100%",
  alignItems: "center",
  paddingLeft: 52
};

const styles = {
  workflow: {
    ...baseStyle
  },
  name: {
    ...baseName
  },
  hoveredWorkflow: {
    ...baseStyle,
    backgroundColor: "#424242",
    borderRadius: 5,
    cursor: "pointer"
  },
  selectedWorkflow: {
    ...baseStyle,
    backgroundColor: "#616161",
    borderRadius: 5
  },
  hoveredName: {
    ...baseName,
    textDecoration: "none",
    color: "#b9bbbe"
  },
  selectedName: {
    ...baseName,
    textDecoration: "none",
    color: "#FFFFFF"
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
  withRouter(BoardButton)
);
