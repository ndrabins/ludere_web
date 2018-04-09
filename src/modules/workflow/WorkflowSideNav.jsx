import React, { Component } from "react";

import boardsIcon from "../../static/boards.svg";

import CreateWorkflowButton from "./CreateBoardButton";
import BoardList from "./BoardList";

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
            <img src={boardsIcon} />
            <div style={{ marginLeft: 14 }}>Workflow</div>
          </div>
          <CreateWorkflowButton />
        </div>
        <div>
          <BoardList location={this.props.location} />
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
