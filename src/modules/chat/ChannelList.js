import MoreVertIcon from "material-ui-icons/MoreVert";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";

import React, { Component } from 'react';

import ChannelButton from './ChannelButton';

class ChannelList extends Component {
  render() {
    return (
      <div>
        <ChannelButton />
        <ChannelButton />
        <ChannelButton />
      </div>
    );
  }
}

const styles = {

}

export default ChannelList;
