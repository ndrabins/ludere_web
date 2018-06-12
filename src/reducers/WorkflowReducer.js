import {
  SELECT_BOARD,
  FETCH_BOARDS_SUCCESS,
  FETCH_LISTS,
  FETCH_TASKS,
  TOGGLE_TASK_DETAIL,
  SELECT_TASK,
  FETCH_COMMENTS_SUCCESS,
  FETCH_BOARD_DATA,
  FETCH_TAGS
} from "../actions/types";

const initialState = {
  selectedBoard: null,
  boards: {},
  listData: null,
  tagData: {},
  taskData: null,
  showTaskDetail: false,
  selectedTask: null,
  loadingBoards: false,
  loadingLists: false,
  loadingTasks: false,
  loadingTags: false,
  comments: {},
  taskCommentsListener: null,
  tasksListener: null,
  listsListener: null,
  tagsListener: null,
  boardsListener: null
};

export default function workflow(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOARD:
      return {
        ...state,
        selectedBoard: action.selectedBoard,
        selectedTask: null,
        loadingLists: true,
        loadingTasks: true,
        loadingTags: true
      };
    case FETCH_BOARD_DATA:
      return {
        ...state
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.boards,
        loadingBoards: false,
        boardsListener: action.boardsListener
      };
    case FETCH_LISTS:
      return {
        ...state,
        loadingLists: false,
        listData: action.listData,
        listsListener: action.listsListener
      };
    case FETCH_TAGS:
      return {
        ...state,
        loadingTags: false,
        tagData: action.tagData,
        tagsListener: action.tagsListener
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
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        taskCommentsListener: action.taskCommentsListener
      };
    default:
      return state;
  }
}
