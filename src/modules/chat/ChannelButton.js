import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

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
      <div
        style={channelStyle}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
      >
        {this.props.name}
      </div>
    );
  }
}

const styles = {
  channel: {
    color: "white",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50
  },
  hoveredChannel: {
    color: "white",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50,
    backgroundColor: "#2B2B2B",
    borderRadius: 5,
    cursor: "pointer"
  },
  selectedChannel: {
    color: "white",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 1,
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 50,
    backgroundColor: "#575757",
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
