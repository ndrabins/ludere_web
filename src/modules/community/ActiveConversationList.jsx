import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

import ActiveConversationButton from "./ActiveConversationButton";

class ActiveConversationList extends Component {
  renderConversations() {
    if (!this.props.conversations || !this.props.activeConversations) {
      //return nothing while these are getting fetched.
      return;
    }

    let conversations = Map(this.props.conversations, (conversation, key) => {
      let title = "";
      Map(conversation.members, (memberStatus, memberID) => {
        title += this.props.workspaceUsers[memberID].displayName;
      });

      if (this.props.activeConversations[key]) {
        return (
          <div key={key}>
            <ActiveConversationButton conversationID={key} name={title} />
          </div>
        );
      }
    });
    return conversations;
  }

  render() {
    return <div>{this.renderConversations()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    activeConversations: state.profile.myUserProfile.conversations,
    conversations: state.community.conversations,
    myID: state.auth.user.uid,
    workspaceUsers: state.workspace.workspaceUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ActiveConversationList
);
