const initialState = {
  error: null,
  user: null,
  loading: false,
  uid,
  username,
  status
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        authenticated: false,
        error: null,
        loading: true
      };
    default:
      return state;
  }
}
