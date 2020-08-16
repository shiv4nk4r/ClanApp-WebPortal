const initialState = null;

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.payload;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};

export default loggedReducer;
