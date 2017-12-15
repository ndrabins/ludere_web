import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  tasks: {}
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOARD:
      return { ...state, selectedBoard: action.selectedBoard };
    case FETCH_BOARDS:
      return state;
    case FETCH_BOARDS_SUCCESS:
      return { ...state, boards: action.boards };
    default:
      return state;
  }
}
