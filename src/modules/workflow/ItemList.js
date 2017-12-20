import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./Item";

class ItemList extends Component {
  renderItems = dropProvided => {
    const { items } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.dropZone} ref={dropProvided.innerRef}>
          {items.map(item => (
            <Draggable key={item.id} draggableId={item.id} type={"ITEM"}>
              {(dragProvided, dragSnapshot) => (
                <div>
                  <Item
                    key={item.id}
                    item={item}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                  />
                  {dragProvided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </div>
      </div>
    );
  };

  render() {
    const { columnID, items } = this.props;

    const stringColumnID = columnID.toString();

    return (
      <Droppable droppableId={stringColumnID} type={"ITEM"}>
        {(dropProvided, dropSnapshot) => (
          <div style={styles.wrapper}>{this.renderItems(dropProvided)}</div>
        )}
      </Droppable>
    );
  }
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "purple"
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  dropZone: {
    minHeight: 250,
    marginBottom: 8
  }
};

export default ItemList;
