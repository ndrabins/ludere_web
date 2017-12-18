import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from "material-ui/Button";

import Column from "./Column";
import { initialize } from "redux-form";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const moveToOtherList = (list1, list2, sourceIndex, destinationIndex) => {
  const resultList1 = [...list1];
  const resultList2 = [...list2];
  const [removed] = resultList1.splice(sourceIndex, 1);
  resultList2.splice(destinationIndex, 0, removed);

  return [resultList1, resultList2];
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {
        1: {
          id: 1,
          title: "Accounts",
          items: [{ id: 3, content: "a" }, { id: 4, content: "b" }]
        },
        2: {
          id: 2,
          title: "Cards",
          items: [{ id: 5, content: "c" }, { id: 6, content: "d" }]
        },
        3: {
          id: 3,
          title: "Stuff",
          items: [{ id: 9, content: "e" }, { id: 10, content: "f" }]
        }
      },
      orderOfColumns: [1, 2, 3]
    };
  }

  onDragStart = initial => {
    console.log("starting drag");
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    console.log("source:", source);
    console.log("destination", destination);
    // reordering column
    if (result.type === "COLUMN") {
      const orderOfColumns = reorder(
        this.state.orderOfColumns,
        source.index,
        destination.index
      );

      this.setState({
        orderOfColumns
      });
    }
    return;
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        style={{ overflowX: "auto" }}
      >
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided, snapshot) => (
            <div style={styles.container} ref={provided.innerRef}>
              {this.state.orderOfColumns.map(key => (
                <Column key={key} data={this.state.columns[key]} />
              ))}
            </div>
          )}
        </Droppable>
        <Button> Add list </Button>
      </DragDropContext>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    backgroundColor: "green"
  }
};

export default Board;
