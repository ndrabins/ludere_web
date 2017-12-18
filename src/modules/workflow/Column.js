import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Column extends Component {
  render() {
    const { title, id, items } = this.props.data;
    console.log(id);
    console.log(this.props.data);

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
                <div>ITEM 1</div>
                <div>ITEM 2</div>
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
    backgroundColor: "blue"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "red",
    padding: 10
  }
};

export default Column;
