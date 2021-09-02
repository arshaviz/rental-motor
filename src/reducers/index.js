import { combineReducers } from 'redux';
import rentsReducer from './rentsReducer';
import itemsReducer from './ItemReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({ rentsReducer, itemsReducer, sessionReducer });
