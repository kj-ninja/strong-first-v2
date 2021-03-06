import React from 'react';
import moment from "moment";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {changeMonth} from "./calendarSlice";
import './MonthPicker.scss';

const MonthPicker = () => {
  const dispatch = useDispatch();
  const {calendarStructure, pickedMonth} = useSelector((state) => {
      return {
        calendarStructure: state.calendar.calendarStructure,
        pickedDate: state.calendar.pickedDate,
        pickedMonth: state.calendar.pickedMonth,
        monthData: state.calendar.monthData,
      }
    },
    shallowEqual
  );

  const getMonth = (value) => moment(value).format('MMMM YYYY');

  const handleMonthChange = (direction) => {
    dispatch(changeMonth(direction, calendarStructure, pickedMonth));
  };

  return (
    <div className="month-picker">
      <div className="month-picker__controls">

        <i className="fas fa-caret-left" onClick={() => handleMonthChange('previous')}/>

        <span className="month-picker__controls--month"> {getMonth(pickedMonth)} </span>

        <i className="fas fa-caret-right" onClick={() => handleMonthChange('next')}/>
      </div>

    </div>
  );
};

export default MonthPicker;
