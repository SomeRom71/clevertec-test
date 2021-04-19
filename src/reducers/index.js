import formReducer from './form-reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  form: formReducer,
});
