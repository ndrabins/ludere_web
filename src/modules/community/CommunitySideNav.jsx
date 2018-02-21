import React, { Component } from "react";

import PeopleIcon from "material-ui-icons/PeopleOutline";

import CommunityAddButton from "./CommunityAddButton";
import ActiveConversationList from "./ActiveConversationList";

class CommunitySideNav extends Component {
  handleCommunityClick() {
    this.props.history.push("/community/");
  }

  render() {
    return (
      <div>
        <div style={styles.title}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={() => this.handleCommunityClick()}
          >
            <PeopleIcon />
            <div style={{ marginLeft: 14 }}>Community</div>
          </div>
          <CommunityAddButton />
        </div>
        <div>
          <ActiveConversationList />
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: "0px 10px 0 32px"
  }
};

export default CommunitySideNav;
