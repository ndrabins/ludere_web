import {
  FETCH_DIRECT_MESSAGE,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_ERROR,
  FETCH_CONVERSATION_MESSAGES,
  FETCH_CONVERSATION_MESSAGES_SUCCESS,
  FETCH_CONVERSATION_MESSAGES_ERROR,
  SEND_DIRECT_MESSAGE,
  ADD_ACTIVE_CONVERSATION,
  ADD_ACTIVE_CONVERSATION_SUCCESS,
  ADD_ACTIVE_CONVERSATION_ERROR,
} from "../actions/types";

const initialState = {
  selectedConversation: null, //a chat ID
  messages: {}, // list of message objects
  conversations: {}//list of active/recent conversations to have in the sidebar
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case FETCH_DIRECT_MESSAGE:
      return state;
    case CREATE_CONVERSATION:
      return state;
    case CREATE_CONVERSATION_SUCCESS:
      return state;
    case CREATE_CONVERSATION_ERROR:
      return state;
    case FETCH_CONVERSATION_MESSAGES:
      return { ...state, selectedConversation: action.selectedConversation };
    case FETCH_CONVERSATION_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages
      };
    case FETCH_CONVERSATION_MESSAGES_ERROR:
      return state;
    case SEND_DIRECT_MESSAGE:
      return state;
    case ADD_ACTIVE_CONVERSATION:
      return state;
    case ADD_ACTIVE_CONVERSATION_SUCCESS:
      return state;
    case ADD_ACTIVE_CONVERSATION_ERROR:
      return state;
    default:
      return state;
  }
}
