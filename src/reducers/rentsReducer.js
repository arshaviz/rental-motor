import {
    ADD_RENT,
    REMOVE_RENT,
    ADD_RENTS,
    CHANGE_RENT_STATUS,
  } from '../constants/index';
  
  const initialState = {
    rents: [],
  };
  
  const rentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_RENT: {
        return { ...state, rents: [...state.rents, action.payload.rent] };
      }
      case REMOVE_RENT: {
        return {
          ...state,
          rents: state.rents.filter(rent => rent.id !== action.payload.id),
        };
      }
      case CHANGE_RENT_STATUS: {
        const newRents = state.rents.map(rent => {
          if (rent.id === action.payload.id) {
            const editedRent = { ...rent, status: action.payload.status };
            return editedRent;
          }
          return rent;
        });
        return {
          ...state,
          rents: newRents,
        };
      }
      case ADD_RENTS: {
        return { ...state, rents: action.payload.rents };
      }
      default:
        return state;
    }
  };
  
  export default rentsReducer;
  