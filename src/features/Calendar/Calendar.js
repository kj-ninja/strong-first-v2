import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {getCalendarInitialData, getDaysOfWeek} from "./calendarSlice";
import {getDay, cutWeekDay, isToday, isNormalDay} from "./helpers";
import './Calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const [today] = useState(moment().format('YYYY-MM-DD'));
  const {calendarStructure, pickedMonth, monthData} = useSelector((state) => {
      return {
        calendarStructure: state.calendar.calendarStructure,
        pickedMonth: state.calendar.pickedMonth,
        monthData: state.calendar.monthData,
      }
    },
    shallowEqual
  );

  useEffect(()=> {
    dispatch(getCalendarInitialData(today));
    dispatch(getDaysOfWeek());
  }, [today, dispatch]);

  const getMonthData = () => {
    if (calendarStructure.length) {
      const formattedMonth = moment(pickedMonth).startOf('month').format('YYYY-MM-DD');
      return calendarStructure.find((item) => item.month === formattedMonth).dates;
    }
    return [];
  };

  const handleDatePick = (day) => {
    console.log('Yo kliknales w dzien: ', day);
  };

  return (
    <div className="calendar">

      {monthData.map((name, index) => (
        <div className="calendar__week-days" key={index}>
          {cutWeekDay(name)}
        </div>
      ))}

      {getMonthData().map((day, index) => (
        <div className="calendar__item"
             key={day.date}
             onClick={() => handleDatePick(day, index)}>

          <div className="calendar__item__bottom">
              <span className="item-bottom__day">
                {getDay(day.date)}
              </span>

            {isToday(day.date) ? (
              <span className="item-bottom__today"/>
            ) : null}

            {isNormalDay(day) ? (
              <div className="item-bottom__add"/>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
