export const logUser = (logUser) => {
  console.log(" i am log user call",logUser);
  return {
    type: "LOGGED",
    payload: logUser,
  };
};

export const logOut = (logOut) => {
  return {
    type: "LOGOUT",
    payload: logOut,
  };
};
