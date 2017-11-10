import React, { Component } from 'react';

class ChannelList extends Component {
  state = {
    anchorEl: null,
    openNavMenu: false,
    isHovered: false,
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
  }

  render() {
    return (
      <div style={this.state.isHovered ? styles.hoveredChannel : styles.channel} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        # Channel 1
      </div>
    );
  }
}

const styles = {
  channel :{
    color:'white',
    marginLeft: 8,
    marginRight: 8,
    display:'flex',
    alignContent: 'center',
    padding: 5,
    paddingLeft: 50
  },
  hoveredChannel :{
    color:'white',
    marginLeft: 8,
    marginRight: 8,
    display:'flex',
    alignContent: 'center',
    padding: 5,
    paddingLeft: 50,
    backgroundColor: "#636363",
    borderRadius: 5,
    cursor: "pointer",
  }
}

export default ChannelList;
