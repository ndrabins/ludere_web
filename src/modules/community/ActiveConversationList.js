import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

class ActiveConversationList extends Component {
  renderChannels() {
    if (!this.props.channels) {
      return;
    }
    let channels = Map(this.props.channels, (channel, key) => {
      return (
        <div key={key}>
          <ChannelButton ID={key} name={channel.name}/>
        </div>
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

function mapStateToProps(state) {
  return {
    // channels: state.profile.myUserProfile.,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveConversationList);
