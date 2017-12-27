import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARD_DATA,
  CREATE_BOARD,
  CREATE_LIST
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  boardData: {}
};

export default function workflow(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOARD:
      return { ...state, selectedBoard: action.selectedBoard };
    case FETCH_BOARDS:
      return state;
    case FETCH_BOARDS_SUCCESS:
      return { ...state, boards: action.boards };
    case CREATE_BOARD:
      return state;
    case FETCH_BOARD_DATA:
      return { ...state, boardData: action.boardData };
    default:
      return state;
  }
}
