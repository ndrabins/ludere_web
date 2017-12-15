import React, { Component } from "react";

import Message from "material-ui-icons/Message";

import CreateWorkflowButton from "./CreateBoardButton";
import WorkflowBoardButton from "./WorkFlowBoardButton";

class WorkflowSideNav extends Component {
  render() {
    return (
      <div>
        <div style={styles.title}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Message />
            <div style={{ marginLeft: 14 }}>Workflow</div>
          </div>
          <CreateWorkflowButton />
        </div>
        <div>
          <WorkflowBoardButton />
          <WorkflowBoardButton />
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

export default WorkflowSideNav;
