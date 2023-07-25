const initialState = {
  authUser: "",
  status: false,
};

const listStreamingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED":
      return {
        ...state,
        authUser: action.payload,
      };

    case "LOGOUT":
      console.log("I am logout");

      return {
        ...state,
        authUser: "",
      };

    default:
      return state;
  }
};

export default listStreamingReducer;
