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
              <div {...provided.dragHandleProps}>{title}</div>
              <div>
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
    height: 300,
    width: 200,
    backgroundColor: "blue",
    margin: 10
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "red"
  }
};

export default Column;
