import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

class MessageList extends Component {
  render() {
    return (
      <div style={styles.container}>
        MessageList
      </div>
    );
  }
}

const styles = {
  container:{
    display:'flex',
    backgroundColor: 'blue',
    flex:1
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
