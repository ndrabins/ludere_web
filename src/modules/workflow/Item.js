import React, { Component } from "react";

class Item extends Component {
  render() {
    const { item, isDragging, provided } = this.props;

    return (
      <div
        ref={provided.innerRef}
        style={{ ...styles.container, ...provided.draggableStyle }}
        {...provided.dragHandleProps}
      >
        <div> {item.content} </div>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: 40,
    cursor: "grab",
    border: "1px solid grey",
    borderRadius: 5,
    backgroundColor: "teal",
    display: "flex",
    alignItems: "center"
  },
  content: {}
};

export default Item;
