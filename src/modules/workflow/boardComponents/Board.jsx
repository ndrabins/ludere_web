import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import TextField from "@material-ui/core/TextField";
import Column from "./Column";

class Board extends Component {
  state = {
    listName: ""
  };

  componentDidMount() {
    this.props.actions.fetchBoardData(this.props.selectedBoard);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  createList = () => {
    if (this.state.listName === "") {
      return;
    }
    this.props.actions.createList(
      this.props.selectedBoard,
      this.state.listName
    );

    this.setState({
      listName: ""
    });
  };

  onDragStart = initial => {
    // console.log("starting drag");
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

    //moving within same column
    if (source.droppableId === destination.droppableId) {
      this.props.actions.changeTaskOrder(
        source.index,
        destination.index,
        source.droppableId
      );
      return;
    }

    //item is moving columns
    if (source.droppableId !== destination.droppableId) {
      this.props.actions.moveTaskToColumn(
        source.index,
        destination.index,
        source.droppableId,
        destination.droppableId
      );
      return;
    }
  };

  render() {
    const { selectedBoard, boards, listData, showTaskDetail } = this.props;

    const board = boards[selectedBoard];

    if (!board) {
      return <div />;
    }

    const { listOrder } = board;

    return (
      <div className={styles.root}>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {provided => (
              <div
                style={
                  showTaskDetail
                    ? { ...styles.container, paddingRight: 400 }
                    : styles.container
                }
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {listOrder.map((ID, index) => (
                  <Column
                    key={ID}
                    ID={ID}
                    index={index}
                    list={listData[ID]}
                    boardID={selectedBoard}
                  />
                ))}
                <div style={styles.listEntryDiv}>
                  <TextField
                    id="listName"
                    placeholder="Add a list..."
                    value={this.state.listName}
                    onChange={this.handleChange("listName")}
                    margin="normal"
                    onKeyPress={ev => {
                      if (ev.key === "Enter" && !ev.shiftKey) {
                        this.createList();
                        ev.preventDefault();
                      }
                    }}
                    InputProps={{
                      disableUnderline: true
                    }}
                  />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "100%"
  },
  container: {
    display: "flex",
    paddingRight: 58
  },
  listEntryDiv: {
    height: 60,
    minWidth: 200,
    backgroundColor: "#E5E5E6",
    margin: 6,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    paddingRIght: 10
  }
};

function mapStateToProps(state) {
  return {
    listData: state.workflow.listData,
    boards: state.workflow.boards,
    selectedBoard: state.workflow.selectedBoard,
    showTaskDetail: state.workflow.showTaskDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
