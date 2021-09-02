import { LOGIN, LOGOUT } from '../constants/index';

const initialState = {
  session: {
    isLoggedIn: false,
    user: {},
  },
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        session: {
          isLoggedIn: action.payload.isLoggedIn,
          user: action.payload.user,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        session: {
          isLoggedIn: action.payload.isLoggedIn,
          user: action.payload.user,
        },
      };
    }
    default:
      return state;
  }
};

export default sessionReducer;
