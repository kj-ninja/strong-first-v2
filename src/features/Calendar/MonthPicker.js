import React from 'react';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {changeMonth} from "./calendarSlice";
import {getMonth} from "./helpers";
import './MonthPicker.scss';

const MonthPicker = () => {
  const dispatch = useDispatch();
  const {calendarStructure, pickedMonth} = useSelector((state) => {
      return {
        calendarStructure: state.calendar.calendarStructure,
        pickedMonth: state.calendar.pickedMonth,
      }
    },
    shallowEqual
  );

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
