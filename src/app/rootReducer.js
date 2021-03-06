import { combineReducers } from '@reduxjs/toolkit'
import calendarSLice from "../features/Calendar/calendarSlice";

const rootReducer = combineReducers({
  calendar: calendarSLice,
});

export default rootReducer;
