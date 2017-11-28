import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import CommunityList from "./CommunityList";

class Community extends Component {
  componentDidMount(){
    this.props.actions.fetchWorkspaceUsers();
  }

  render() {
    return (
      <div>
        <CommunityList />
      </div>
    );
  }
}

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
