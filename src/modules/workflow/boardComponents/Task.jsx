import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import Typography from "material-ui/Typography";

class Task extends Component {
  render() {
    const { task, isDragging, provided, taskID } = this.props;

    if (task === undefined) {
      return <div />;
    }

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{ ...styles.container, ...provided.draggableProps.style }}
        onClick={() => this.props.actions.toggleTaskDetail(taskID)}
      >
        <Typography
          style={{
            display: "flex",
            wordWrap: "break-all",
            overflowWrap: "break-word",
          }}
        >
          {task.title}
        </Typography>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: 30,
    cursor: "grab",
    boxShadow: "0 9px 18px 0 rgba(0, 0, 0, 0.04)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    margin: `0 0 8px 0`,
    display: "flex",
    cursor: 'pointer',
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Task);
