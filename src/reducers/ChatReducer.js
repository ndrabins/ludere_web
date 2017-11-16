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
  SEND_MESSAGE
} from "../actions/types";

const initialState = {
  channels: {},
  messages: {},
  selectedChannel: null
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
        channels: action.channels
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
      return state;
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages
      };
    case FETCH_MESSAGES_ERROR:
      return state;
    case SEND_MESSAGE:
      return state;
    default:
      return state;
  }
}
