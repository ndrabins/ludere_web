import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  CREATE_BOARD
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  tasks: {}
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
    default:
      return state;
  }
}
