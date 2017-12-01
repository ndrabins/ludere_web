import {

} from "../actions/types";

const initialState = {
  selectedChat: null, //a chat ID
  messages: {}, // list of message objects
  conversations: {}//list of active/recent conversations to have in the sidebar
};

export default function team(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
