import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import { createCalendarStructure, generateNewMonthDate } from '../../utils/calendar';

export const calendarSLice = createSlice({
  name: 'calendar',
  initialState: {
    pickedDate: '',
    pickedMonth: '',
    calendarStructure: [],
    monthData: [],
  },
  reducers: {
    setPickedDate(state, data) {
      const { date, dayIndex } = data;
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
    setCalendarStructure(state, data) {
      console.log('data: ', data.payload);
      state.calendarStructure = [
        ...state.calendarStructure,
        data.payload
      ];
    },
    setPickedMonth(state, data) {
      console.log(data);
      state.pickedMonth = data.payload;
    },
    setMonthData(state, data) {
      state.monthData = data.payload;
    },
  },
});

export const {setPickedDate, setCalendarStructure, setPickedMonth, setMonthData} = calendarSLice.actions;
export default calendarSLice.reducer;

export const getCalendarInitialData = (today) => dispatch => {
  const structure = createCalendarStructure(today);

  dispatch(setPickedMonth(today));
  dispatch(setCalendarStructure(structure));
};

export const getDaysOfWeek = () => dispatch => {
  const daysOfWeek = moment.weekdays();
  const sunday = daysOfWeek.shift();
  dispatch(setMonthData([...daysOfWeek, sunday]));
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
