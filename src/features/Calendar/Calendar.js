import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {getCalendarInitialData} from "./calendarSlice";
import {getDay, cutWeekDay, isToday, isNormalDay, getMonthData} from "./helpers";
import bindClassesDynamically from '../../utils/classBinder';
import './Calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const [today] = useState(moment().format('YYYY-MM-DD'));
  const {calendarStructure, pickedMonth, daysOfWeek} = useSelector((state) => {
      return {
        calendarStructure: state.calendar.calendarStructure,
        pickedMonth: state.calendar.pickedMonth,
        daysOfWeek: state.calendar.daysOfWeek,
      }
    },
    shallowEqual
  );

  useEffect(() => {
    dispatch(getCalendarInitialData(today));
  }, [today, dispatch]);


  const handleDatePick = (day) => {
    console.log('Yo kliknales w dzien: ', day);
  };

  return (
    <div className="calendar">

      {daysOfWeek.map((name, index) => (
        <div className="calendar__week-days" key={index}>
          {cutWeekDay(name)}
        </div>
      ))}

      {getMonthData(calendarStructure, pickedMonth).map((day, index) => (
        <div onClick={() => handleDatePick(day, index)}
             key={day.date}
             className={
               bindClassesDynamically({
                 'calendar__item--isToday': isToday(day.date),
                 'calendar__item--isPicked': day.isPicked,
                 'calendar__item--diffMonth': day.isDiffMonth,
                 'calendar__item--hoover': isNormalDay(day),
               }, 'calendar__item')
             }>

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
