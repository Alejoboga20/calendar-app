import React from 'react';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = React.useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    };

    return {
      style
    };
  };

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
      />

      <CalendarModal />
      <AddNewFab />
    </div>
  );
};
