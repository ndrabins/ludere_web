import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

import Button from "material-ui/Button";

import Column from "./Column";
import { initialize } from "redux-form";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {
        1: {
          id: 1,
          title: "Accounts",
          items: [
            {
              id: 11,
              content:
                "AccountsAccounts Accounts Accounts BillboardBillboard BillboardBillboard"
            },
            {
              id: 15,
              content:
                "AccountsAccounts Accounts Accounts BillboardBillboard BillboardBillboard"
            },
            {
              id: 155,
              content:
                "AccountsAccounts Accounts Accounts BillboardBillboard BillboardBillboard"
            },
            { id: 4, content: "Billboard Billboard BillboardBillboard" }
          ]
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

    if (result.type === "COLUMN") {
      this.props.actions.changeColumnOrder(source.index, destination.index);
      return;
    }

    //item is moving
  };

  render() {
    const { selectedBoard, boards, listData } = this.props;
    const board = boards[selectedBoard];
    const { listOrder } = board;

    if (listData === null) {
      return <div> </div>;
    }

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        style={styles.wrapper}
      >
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided, snapshot) => (
            <div style={styles.container} ref={provided.innerRef}>
              {listOrder.map(ID => (
                <Column key={ID} list={listData[ID]} ID={ID} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: "100%"
  },
  wrapper: {
    height: "100%",
    overflowX: "auto"
  }
};

function mapStateToProps(state) {
  return {
    listData: state.workflow.listData,
    boards: state.workflow.boards,
    selectedBoard: state.workflow.selectedBoard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
