import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

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
    if(this.state.isHovered){
      conversationStyle = styles.hoveredConversation;
    }
    if(this.props.conversationID === this.props.selectedConversation){
      conversationStyle = styles.selectedConversation;
    }

    return (
      <Link
        style={conversationStyle}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        to="/community/chat"
      >
        # {this.props.name}
      </Link>
    );
  }
}

const baseStyle = {
  textDecoration: 'none',
  color: "#6f6f6f",
  marginLeft: 8,
  marginRight: 8,
  marginTop: 1,
  marginBottom: 1,
  display: "flex",
  alignContent: "center",
  padding: 5,
  paddingLeft: 50
}

const styles = {
  conversation: {
    ...baseStyle
  },
  hoveredConversation: {
    ...baseStyle,
    backgroundColor: "#424242",
    color: "#b9bbbe",
    borderRadius: 5,
    cursor: "pointer"
  },
  selectedConversation: {
    ...baseStyle,
    color:"#FFFFFF",
    backgroundColor: "#616161",
    borderRadius: 5,
  }
};

function mapStateToProps(state) {
  return {
    selectedConversation: state.community.selectedConversation,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveConversationButton);
