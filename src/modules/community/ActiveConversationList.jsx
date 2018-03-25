import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

import ActiveConversationButton from "./ActiveConversationButton";

class ActiveConversationList extends Component {
  renderConversations() {
    const { conversations, myUserProfile, workspaceUsers } = this.props;

    if (!conversations || !activeConversations || !workspaceUsers) {
      return;
    }
    const { activeConversations } = myUserProfile;

    let displayedConversations = Map(conversations, (conversation, key) => {
      let title = "";
      Map(conversation.members, (memberStatus, memberID) => {
        if(!workspaceUsers[memberID].displayName){
          return;
        }
        title += workspaceUsers[memberID].displayName;
      });

      if (activeConversations[key]) {
        return (
          <div key={key}>
            <ActiveConversationButton conversationID={key} name={title} />
          </div>
        );
      }
    });
    return displayedConversations;
  }

  render() {
    return <div>{this.renderConversations()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    myUserProfile: state.profile.myUserProfile,
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