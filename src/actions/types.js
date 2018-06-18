//Authentication Actions
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_USER = "AUTH_USER";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOAD_APP_DATA = "LOAD_APP_DATA";
export const LOAD_APP_DATA_ERROR = "LOAD_APP_DATA_ERROR";
export const LOAD_APP_DATA_SUCCESS = "LOAD_APP_DATA_SUCCESS";
export const INITIALIZE_USER = "INITIALIZE_USER";

//Team actions
export const CREATE_TEAM = "CREATE_TEAM";
export const CREATE_TEAM_SUCCESS = "CREATE_TEAM_SUCCESS";
export const CREATE_TEAM_ERROR = "CREATE_TEAM_ERROR";

export const JOIN_TEAM = "JOIN_TEAM";
export const REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER";

export const FETCH_TEAMS = "FETCH_TEAMS";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_ERROR = "FETCH_TEAMS_ERROR";

export const SELECT_TEAM = "SELECT_TEAM";

//Chat Actions
export const SELECT_CHANNEL = "SELECT_CHANNEL";

export const CREATE_CHANNEL = "CREATE_CHANNEL";
export const CREATE_CHANNEL_SUCCESS = "CREATE_CHANNEL_SUCCESS";
export const CREATE_CHANNEL_ERROR = "CREATE_CHANNEL_ERROR";

export const FETCH_CHANNELS = "FETCH_CHANNELS";
export const FETCH_CHANNELS_SUCCESS = "FETCH_CHANNELS_SUCCESS";
export const FETCH_CHANNELS_ERROR = "FETCH_CHANNELS_ERROR";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MORE_MESSAGES = "FETCH_MORE_MESSAGES";
export const FETCH_MORE_MESSAGES_SUCCESS = "FETCH_MORE_MESSAGES_SUCCESS";

export const FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const UPDATE_CHANNEL = "UPDATE_CHANNEL";
export const DELETE_CHANNEL = "DELETE_CHANNEL";

export const UNSUBSCRIBE_CHANNELS = "UNSUBSCRIBE_CHANNELS";
export const UNSUBSCRIBE_MESSAGES = "UNSUBSCRIBE_MESSAGES";

//Workspace Actions
export const SELECT_WORKSPACE = "SELECT_WORKSPACE";

export const CREATE_WORKSPACE = "CREATE_WORKSPACE";
export const CREATE_WORKSPACE_SUCCESS = "CREATE_WORKSPACE_SUCCESS";
export const CREATE_WORKSPACE_ERROR = "CREATE_WORKSPACE_ERROR";

export const FETCH_WORKSPACES = "FETCH_WORKSPACES";
export const FETCH_WORKSPACES_SUCCESS = "FETCH_WORKSPACES_SUCCESS";
export const FETCH_WORKSPACES_ERROR = "FETCH_WORKSPACES_ERROR";

export const JOIN_WORKSPACE = "JOIN_WORKSPACE";
export const JOIN_WORKSPACE_SUCCESS = "JOIN_WORKSPACE_SUCCESS";
export const JOIN_WORKSPACE_ERROR = "JOIN_WORKSPACE_ERROR";

export const FETCH_WORKSPACE_USERS = "FETCH_WORKSPACE_USERS";
export const FETCH_WORKSPACE_USERS_SUCCESS = "FETCH_WORKSPACE_USERS_SUCCESS";
export const FETCH_WORKSPACE_USERS_ERROR = "FETCH_WORKSPACE_USERS_ERROR";

//Community Actions
export const FETCH_DIRECT_MESSAGE = "FETCH_DIRECT_MESSAGE";
export const SEND_DIRECT_MESSAGE = "SEND_DIRECT_MESSAGE";

export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const CREATE_CONVERSATION_SUCCESS = "CREATE_CONVERSATION_SUCCESS";
export const CREATE_CONVERSATION_ERROR = "CREATE_CONVERSATION_ERROR";

export const FETCH_CONVERSATION_MESSAGES = "FETCH_CONVERSATION_MESSAGES";
export const FETCH_CONVERSATION_MESSAGES_SUCCESS =
  "FETCH_CONVERSATION_MESSAGES_SUCCESS";
export const FETCH_CONVERSATION_MESSAGES_ERROR =
  "FETCH_CONVERSATION_MESSAGES_ERROR";

export const FETCH_CONVERSATIONS = "FETCH_CONVERSATIONS";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_ERROR = "FETCH_CONVERSATIONS_ERROR";

export const ADD_ACTIVE_CONVERSATION = "ADD_ACTIVE_CONVERSATION";
export const ADD_ACTIVE_CONVERSATION_SUCCESS =
  "ADD_ACTIVE_CONVERSATION_SUCCESS";
export const ADD_ACTIVE_CONVERSATION_ERROR = "ADD_ACTIVE_CONVERSATION_ERROR";

export const SET_CONVERSATION_INACTIVE = "SET_CONVERSATION_INACTIVE";

export const UNSUBSCRIBE_CONVERSATION_MESSAGES =
  "UNSUBSCRIBE_CONVERSATION_MESSAGES";
export const UNSUBSCRIBE_CONVERSATIONS = "UNSUBSCRIBE_CONVERSATIONS";

//Profile Actions
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const FETCH_MY_USER_PROFILE_SUCCESS = "FETCH_MY_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_ERROR = "FETCH_USER_PROFILE_ERROR";

//Workflow Actions
export const SELECT_BOARD = "SELECT_BOARD";
export const CREATE_BOARD = "CREATE_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const FETCH_BOARDS = "FETCH_BOARDS";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARD_DATA = "FETCH_BOARD_DATA";
export const CREATE_LIST = "CREATE_LIST";
export const FETCH_LISTS = "FETCH_LISTS";
export const DELETE_LIST = "DELETE_LIST";
export const CHANGE_COLUMN_ORDER = "CHANGE_COLUMN_ORDER";
export const UPDATE_LIST = "UPDATE_LIST";
export const UNSUBSCRIBE_BOARD_DATA = "UNSUBSCRIBE_BOARD_DATA";
export const UNSUBSCRIBE_BOARDS = "UNSUBSCRIBE_BOARDS";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const CREATE_TAG = "CREATE_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const FETCH_TAGS = "FETCH_TAGS";

//Task Actions
export const TOGGLE_TASK_DETAIL = "TOGGLE_TASK_DETAIL";
export const SELECT_TASK = "SELECT_TASK";
export const CHANGE_TASK_ORDER = "CHANGE_TASK_ORDER";
export const MOVE_TASK_TO_COLUMN = "MOVE_TASK_TO_COLUMN";
export const CREATE_TASK = "CREATE_TASK";
export const FETCH_TASKS = "FETCH_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const UNSUBSCRIBE_TASK_COMMENTS = "UNSUBSCRIBE_TASK_COMMENTS";

//Notification Actions
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const NOTIFICATION_READ = "NOTIFICATION_READ";
