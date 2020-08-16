const initialState = null;

const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case "USER_ASSIGN":
      return action.payload;
    case "USER_REMOVE":
      return null;
    default:
      return state;
  }
};

export default userDetails;
