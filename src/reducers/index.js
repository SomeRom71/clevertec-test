import formReducer from './form-reducer';
import { combineReducers } from 'redux';

// use combineReducer for having possibility to extend reducers
export const rootReducer = combineReducers({
  form: formReducer,
});
