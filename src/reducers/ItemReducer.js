import {
    ADD_ITEM, ADD_ITEMS, REMOVE_ITEM, EDIT_ITEM,
  } from '../constants/index';
  
  const initialState = {
    items: [],
  };
  
  const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM: {
        return { ...state, items: [...state.items, action.payload.item] };
      }
      case REMOVE_ITEM: {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      case EDIT_ITEM: {
        const newItems = state.items.map(item => {
          if (item.id === action.payload.item.id) {
            return action.payload.item;
          }
          return item;
        });
        return {
          ...state,
          items: newItems,
        };
      }
      case ADD_ITEMS: {
        return { ...state, items: action.payload.items };
      }
      default:
        return state;
    }
  };
  
  export default itemsReducer;
  