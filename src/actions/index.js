import {
    ADD_ITEM,
    ADD_ITEMS,
    ADD_RENT,
    ADD_RENTS,
    CHANGE_RENT_STATUS,
    LOGIN,
    LOGOUT,
    REMOVE_ITEM,
    EDIT_ITEM,
    REMOVE_RENT,
  } from '../constants/index';
  
  export const addItems = items => ({
    type: ADD_ITEMS,
    payload: { items },
  });
  
  export const addItem = item => ({
    type: ADD_ITEM,
    payload: { item },
  });
  
  export const removeItem = id => ({
    type: REMOVE_ITEM,
    payload: { id },
  });
  
  export const editItem = item => ({
    type: EDIT_ITEM,
    payload: { item },
  });
  
  export const addRent = rent => ({
    type: ADD_RENT,
    payload: { rent },
  });
  
  export const addRents = rents => ({
    type: ADD_RENTS,
    payload: { rents },
  });
  
  export const removeRent = id => ({
    type: REMOVE_RENT,
    payload: { id },
  });
  
  export const changeRentStatus = (id, status) => ({
    type: CHANGE_RENT_STATUS,
    payload: { id, status },
  });
  
  export const loginHandler = data => ({
    type: LOGIN,
    payload: {
      isLoggedIn: true,
      user: data.user,
    },
  });
  
  export const logoutHandler = () => ({
    type: LOGOUT,
    payload: {
      isLoggedIn: false,
      user: {},
    },
  });
  