export const setUserSignedIn = (data) => {
  return {
    type: "SIGN_IN",
    payload: data,
  };
};

export const setUserLoggedOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const setUserDetails = (data) => {
  return {
    type: "USER_ASSIGN",
    payload: data,
  };
};

export const setUserRemove = (data) => {
  return {
    type: "USER_REMOVE",
  };
};
