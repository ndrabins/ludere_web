import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";
import Map from "lodash/map";

import TextField from "material-ui/TextField";

import Column from "./Column";
import Loading from "../../../common/Loading";
// import index from "@firebase/app";

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
    const {
      selectedBoard,
      boards,
      listData,
      showTaskDetail,
      loadingTasks,
      loadingLists
    } = this.props;
    const board = boards[selectedBoard];

    if (loadingLists || loadingTasks) {
      return <Loading />;
    }

    const { listOrder } = board;

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        style={styles.wrapper}
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
                <Column key={ID} ID={ID} index={index} />
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
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
    paddingRight: 58
  },
  wrapper: {
    height: "100%"
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
    showTaskDetail: state.workflow.showTaskDetail,
    loadingLists: state.workflow.loadingLists,
    loadingTasks: state.workflow.loadingTasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
