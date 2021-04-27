import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import { createCalendarStructure, generateNewMonthDate } from './helpers';

export const calendarSLice = createSlice({
  name: 'calendar',
  initialState: {
    pickedDate: '',
    pickedMonth: '',
    calendarStructure: [],
    daysOfWeek: [],
  },
  reducers: {
    setPickedDate(state, {payload}) {
      const { date, dayIndex } = payload;
      let monthDate = moment(date).startOf('month').format('YYYY-MM-DD');
      const monthIndex = state.calendarStructure.findIndex((item) => item.month === monthDate);
      const pickedDateExist = state.pickedDate.length;

      if (pickedDateExist) {
        monthDate = moment(state.pickedDate).startOf('month').format('YYYY-MM-DD');

        const oldMonthIndex = state.calendarStructure.findIndex((item) => item.month === monthDate);

        const oldDateIndex = state.calendarStructure[oldMonthIndex].dates
          .findIndex((day) => day.date === state.pickedDate);

        state.calendarStructure[oldMonthIndex].dates[oldDateIndex].isPicked = false;
      }

      state.pickedDate = date;
      state.calendarStructure[monthIndex].dates[dayIndex].isPicked = true;
    },
    setCalendarStructure(state, {payload}) {
      state.calendarStructure = [
        ...state.calendarStructure,
        payload
      ];
    },
    setPickedMonth(state, {payload}) {
      state.pickedMonth = payload;
    },
    setDaysOfWeek(state, {payload}) {
      state.daysOfWeek = payload;
    },
  },
});

export const {setPickedDate, setCalendarStructure, setPickedMonth, setDaysOfWeek} = calendarSLice.actions;
export default calendarSLice.reducer;

export const getCalendarInitialData = (today) => dispatch => {
  const structure = createCalendarStructure(today);
  const daysOfWeek = moment.weekdays();
  const sunday = daysOfWeek.shift();

  dispatch(setDaysOfWeek([...daysOfWeek, sunday]));
  dispatch(setPickedMonth(today));
  dispatch(setCalendarStructure(structure));
};

export const changeMonth = (direction, calendarStructure, pickedMonth) => dispatch => {
  const newMonth = generateNewMonthDate(direction, pickedMonth);
  const monthExist = calendarStructure.some((item) => item.month === newMonth);

  if (!monthExist) {
    const structure = createCalendarStructure(newMonth);

    dispatch(setCalendarStructure(structure));
  }

  dispatch(setPickedMonth(newMonth));
};
