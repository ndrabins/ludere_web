import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Avatar from "material-ui/Avatar";
import PersonOutlineIcon from "material-ui-icons/PersonOutline";
import Typography from "material-ui/Typography";

import { Link } from "react-router-dom";

class ActiveConversationButton extends Component {
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
    this.props.actions.fetchConversationMessages(this.props.conversationID);
  };

  render() {
    let conversationStyle = styles.conversation;
    let nameStyle = styles.name;
    if (this.state.isHovered) {
      conversationStyle = styles.hoveredConversation;
      nameStyle = styles.hoveredName;
    }
    if (this.props.conversationID === this.props.selectedConversation) {
      conversationStyle = styles.selectedConversation;
      nameStyle = styles.selectedName;
    }

    return (
      <div
        style={conversationStyle}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <Link style={nameStyle} onClick={this.handleClick} to="/community/chat">
          <Avatar style={{ marginRight: 10 }}>
            <PersonOutlineIcon />
          </Avatar>
          <Typography style={{color:'white' }}noWrap> {this.props.name} </Typography>
        </Link>
        <IconButton
          style={{
            color: nameStyle.color,
            width: 40,
            paddingLeft: 10
          }}
          aria-label="Delete"
          onClick={() =>
            this.props.actions.setConversationInactive(
              this.props.conversationID
            )
          }
        >
          <CloseIcon style={{ fontSize: 16 }} />
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
  marginRight: 8,
  marginBottom: 1,
  padding: 3,
};

const baseName = {
  textDecoration: "none",
  color: "#6f6f6f",
  display: "flex",
  width: "100%",
  alignItems: "center",
};

const styles = {
  conversation: {
    ...baseStyle
  },
  name: {
    ...baseName
  },
  hoveredConversation: {
    ...baseStyle,
    backgroundColor: "#424242",
    borderRadius: 5,
    cursor: "pointer"
  },
  selectedConversation: {
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
    selectedConversation: state.community.selectedConversation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ActiveConversationButton
);
