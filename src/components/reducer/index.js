import { combineReducers } from 'redux';

import pageReducer from './pageReducer';
import sessionReducer from './session';

const rootReducer = combineReducers({
    pageSession : pageReducer,
    userSession : sessionReducer
  });
  
  export default rootReducer;