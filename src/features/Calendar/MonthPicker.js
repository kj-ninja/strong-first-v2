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

  const handleMonth = (direction) => {
    dispatch(changeMonth(direction, calendarStructure, pickedMonth));
  };

  const getMonth = (value) => moment(value).format('MMMM YYYY');

  return (
    <div className="month-picker">
      <div className="month-picker__controls">

        <i className="fas fa-caret-left" onClick={() => handleMonth('previous')}/>

        <span className="month-picker__controls--month"> {getMonth(pickedMonth)} </span>

        <i className="fas fa-caret-right" onClick={() => handleMonth('next')}/>
      </div>

    </div>
  );
};

export default MonthPicker;
