import { combineReducers } from '@reduxjs/toolkit'
import userSlice from '../auth/userSlice';
import calendarSLice from "../features/Calendar/calendarSlice";

const rootReducer = combineReducers({
  user: userSlice,
  calendar: calendarSLice,
});

export default rootReducer;
