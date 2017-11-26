import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Link } from "react-router-dom";

class ChannelButton extends Component {
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
    this.props.actions.selectChannel(this.props.ID);
  };

  render() {
    let channelStyle = styles.channel;
    if(this.state.isHovered){
      channelStyle = styles.hoveredChannel;
    }
    if(this.props.ID === this.props.selectedChannel){
      channelStyle = styles.selectedChannel;
    }

    return (
      <Link
        style={channelStyle}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        to="/team/chat"
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
  channel: {
    ...baseStyle
  },
  hoveredChannel: {
    ...baseStyle,
    backgroundColor: "#424242",
    color: "#b9bbbe",
    borderRadius: 5,
    cursor: "pointer"
  },
  selectedChannel: {
    ...baseStyle,
    color:"#FFFFFF",
    backgroundColor: "#616161",
    borderRadius: 5,
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelButton);
