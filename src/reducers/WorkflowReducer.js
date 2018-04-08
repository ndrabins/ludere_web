import {
  SELECT_BOARD,
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  CREATE_BOARD,
  CHANGE_COLUMN_ORDER,
  CHANGE_TASK_ORDER,
  MOVE_TASK_TO_COLUMN,
  UPDATE_LIST,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  UPDATE_TASK,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  UNSUBSCRIBE_TASK_COMMENTS,
  UNSUBSCRIBE_BOARD_DATA,
  UNSUBSCRIBE_BOARDS,
  FETCH_BOARD_DATA
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  listData: null,
  taskData: null,
  showTaskDetail: false,
  selectedTask: null,
  loading: false,
  loadingLists: false,
  loadingTasks: false,
  comments: {},
  taskCommentsListener: null,
  tasksListener: null,
  listsListener: null,
  boardsListener: null
};

export default function workflow(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOARD:
      return { ...state, selectedBoard: action.selectedBoard };
    case FETCH_BOARD_DATA:
      return {
        ...state,
        loadingLists: true,
        loadingTasks: true
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.boards,
        loading: false,
        boardsListener: action.boardsListener
      };
    case FETCH_LISTS:
      return {
        ...state,
        loadingLists: false,
        listData: action.listData,
        listsListener: action.listsListener
      };
    case FETCH_TASKS:
      return {
        ...state,
        loadingTasks: false,
        taskData: action.taskData,
        tasksListener: action.tasksListener
      };
    case TOGGLE_TASK_DETAIL:
      return { ...state, showTaskDetail: !state.showTaskDetail };
    case SELECT_TASK:
      return { ...state, selectedTask: action.selectedTask };
    case CREATE_COMMENT:
      return state;
    case FETCH_COMMENTS:
      return state;
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        taskCommentsListener: action.taskCommentsListener
      };
    case CHANGE_TASK_ORDER:
      return state;
    case MOVE_TASK_TO_COLUMN:
      return state;
    case UPDATE_TASK:
      return state;
    case UNSUBSCRIBE_TASK_COMMENTS:
      return state;
    case UPDATE_LIST:
      return state;
    case CHANGE_COLUMN_ORDER:
      return state;
    case CREATE_BOARD:
      return state;
    case FETCH_BOARDS:
      return { ...state, loading: true };
    case UNSUBSCRIBE_BOARD_DATA:
      return state;
    case UNSUBSCRIBE_BOARDS:
      return state;
    default:
      return state;
  }
}
