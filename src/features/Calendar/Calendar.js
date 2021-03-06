import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {setPickedDate, getCalendarInitialData, daysOfWeek} from "./calendarSlice";
import './Calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const [today] = useState(moment().format('YYYY-MM-DD'));
  const {calendarStructure, pickedDate, pickedMonth, monthData} = useSelector((state) => {
      return {
        calendarStructure: state.calendar.calendarStructure,
        pickedDate: state.calendar.pickedDate,
        pickedMonth: state.calendar.pickedMonth,
        monthData: state.calendar.monthData,
      }
    },
    shallowEqual
  );

  useEffect(()=> {
    dispatch(getCalendarInitialData(today));
    dispatch(daysOfWeek());

  }, [today, dispatch]);

  const getDay = (value) => moment(value).format('DD');
  const cutWeekDay = (value) => value.substring(0, 3);

  const getMonthData = () => {
    if (calendarStructure.length) {
      const formattedMonth = moment(pickedMonth).startOf('month').format('YYYY-MM-DD');
      return calendarStructure.find((item) => item.month === formattedMonth).dates;
    }
    return [];
  };

  const datePickHandle = (day, dayIndex) => {
    console.log('Yo kliknales w dzien: ', day);
    const isDatePicked = pickedDate === day.date;
    if (!isDatePicked && !day.isDiffMonth) {
      setPickedDate({
        date: day.date,
        dayIndex,
      });
    }
  };

  const isToday = (date) => {
    return date === moment().format('YYYY-MM-DD');
  };

  const isNormalDay = (day) => {
    return !day.isDiffMonth && !day.isPicked;
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
             onClick={() => datePickHandle(day, index)}>

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
