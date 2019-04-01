import { combineReducers } from 'redux';

import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    pageSession : pageReducer
  });
  
  export default rootReducer;