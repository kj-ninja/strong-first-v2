import { combineReducers } from '@reduxjs/toolkit'
import userSlice from '../auth/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
