import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  CREATE_BOARD,
  CREATE_LIST,
  CHANGE_COLUMN_ORDER
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  listData: null,
  taskData: {}
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
    case FETCH_LISTS:
      return { ...state, listData: action.listData };
    case FETCH_TASKS:
      return { ...state, taskData: action.taskData };
    case CHANGE_COLUMN_ORDER:
      return state;
    default:
      return state;
  }
}
