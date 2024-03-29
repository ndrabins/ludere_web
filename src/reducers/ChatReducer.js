import {
  SELECT_CHANNEL,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
  FETCH_CHANNELS,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_ERROR,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  SEND_MESSAGE,
  UNSUBSCRIBE_CHANNELS,
  UNSUBSCRIBE_MESSAGES,
  FETCH_MORE_MESSAGES,
  FETCH_MORE_MESSAGES_SUCCESS,
  UPDATE_CHANNEL
} from "../actions/types";

const initialState = {
  channels: {},
  messages: {},
  selectedChannel: null,
  messagesListener: null,
  channelListener: null,
  loadingMessages: false,
  loadingMoreMessages: false
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return {
        ...state,
        selectedChannel: action.selectedChannel
      };
    case FETCH_CHANNELS:
      return state;
    case FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.channels,
        channelListener: action.channelListener
      };
    case FETCH_CHANNELS_ERROR:
      return state;
    case CREATE_CHANNEL:
      return state;
    case CREATE_CHANNEL_SUCCESS:
      return state;
    case CREATE_CHANNEL_ERROR:
      return state;
    case FETCH_MESSAGES:
      return { ...state, loadingMessages: true };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        messagesListener: action.messagesListener,
        loadingMessages: false
      };
    case FETCH_MORE_MESSAGES:
      return { ...state, loadingMoreMessages: true };
    case FETCH_MORE_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        messagesListener: action.messagesListener,
        loadingMoreMessages: false
      };
    case FETCH_MESSAGES_ERROR:
      return state;
    case SEND_MESSAGE:
      return state;
    case UNSUBSCRIBE_CHANNELS:
      return state;
    case UNSUBSCRIBE_MESSAGES:
      return state;
    case UPDATE_CHANNEL:
      return state;
    default:
      return state;
  }
}
