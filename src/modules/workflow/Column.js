import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import ItemList from "./ItemList";

class Column extends Component {
  render() {
    const { title, id, items } = this.props.data;

    return (
      <Draggable draggableId={id} type="COLUMN">
        {(provided, snapshot) => (
          <div style={styles.wrapper}>
            <div
              ref={provided.innerRef}
              style={{ ...styles.container, ...provided.draggableStyle }}
            >
              <div {...provided.dragHandleProps} style={styles.title}>
                {title}
              </div>
              <div style={styles.itemsContainer}>
                <ItemList columnID={id} items={items} />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
    width: 200,
    backgroundColor: "#E5E5E6",
    margin: 10,
    borderRadius: 7
  },
  itemsContainer: {
    padding: 8
  },
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    height: 20,
    padding: 8,
    color: "#FFFFFF",
    display: "flex",
    backgroundColor: "#00BCD4",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  }
};

export default Column;
