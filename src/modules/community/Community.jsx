import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Route } from "react-router-dom";

import CommunityList from "./CommunityList";
import CommunityChat from "./CommunityChat";

class Community extends Component {
  componentDidMount() {
    this.props.actions.fetchWorkspaceUsers();
    this.props.actions.fetchConversations();
  }

  componentWillUnmount() {
    this.props.actions.unsubscribeFromConversations();
  }

  render() {
    return (
      <div style={styles.container}>
        <Route exact path="/" component={CommunityList} />
        <Route exact path="/community/" component={CommunityList} />
        <Route exact path="/community/chat" component={CommunityChat} />
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flex: 1
  }
};

function mapStateToProps(state) {
  return {
    selectedWorkspace: state.workspace.selectedWorkspace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);
