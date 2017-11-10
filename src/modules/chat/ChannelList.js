import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

import MoreVertIcon from "material-ui-icons/MoreVert";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";

import ChannelButton from './ChannelButton';

class ChannelList extends Component {
  renderChannels() {
    if (!this.props.channels) {
      return;
    }
    let channels = Map(this.props.channels, (channel, key) => {
      return (
        <ChannelButton key={key} name={channel.name}/>
      );
    });
    return channels;
  }

  render() {
    return (
      <div>
        {this.renderChannels()}
      </div>
    );
  }
}

const styles = {

}

function mapStateToProps(state) {
  return {
    channels: state.chat.channels,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
