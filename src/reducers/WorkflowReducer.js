import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  CREATE_BOARD,
  CREATE_LIST,
  CHANGE_COLUMN_ORDER,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  UPDATE_LIST,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  UPDATE_TASK_DATE
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  listData: null,
  taskData: null,
  showTaskDetail: false,
  selectedTask: null
};

export default function workflow(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOARD:
      return { ...state, selectedBoard: action.selectedBoard };
    case FETCH_BOARDS_SUCCESS:
      return { ...state, boards: action.boards };
    case FETCH_LISTS:
      return { ...state, listData: action.listData };
    case FETCH_TASKS:
      return { ...state, taskData: action.taskData };
    case TOGGLE_TASK_DETAIL:
      return { ...state, showTaskDetail: !state.showTaskDetail };
    case SELECT_TASK:
      return { ...state, selectedTask: action.selectedTask };
    case CHANGE_TASK_ORDER:
      return state;
    case MOVE_TASK_TO_COLUMN:
      return state;
    case UPDATE_TASK_DATE:
      return state;
    case UPDATE_LIST:
      return state;
    case CHANGE_COLUMN_ORDER:
      return state;
    case CREATE_BOARD:
      return state;
    case FETCH_BOARDS:
      return state;
    default:
      return state;
  }
}
