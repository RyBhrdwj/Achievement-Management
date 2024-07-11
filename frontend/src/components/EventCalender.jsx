import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Loader from './Loader';

const initialValue = dayjs(new Date().toDateString());

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.some(date => dayjs(date).isSame(day, 'day'));

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function EventCalendar({ events }) {
  const requestAbortController = useRef(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(initialValue);

  const fetchHighlightedDays = async (date) => {
    try {
      const highlightedDates = events.map(event => event.date);
      setHighlightedDays(highlightedDates);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching highlighted days:', error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);

    return () => {
      if (requestAbortController.current) {
        requestAbortController.current.abort();
      }
    };
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setHighlightedDays([]);
    // setLoading(true);
    fetchHighlightedDays(date);
  };

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full max-w-sm mx-auto p-4 bg-gray-200 rounded-lg shadow-xl">
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (dayProps) => <ServerDay {...dayProps} highlightedDays={highlightedDays} />,
          }}
          disableFuture
        />
      </div>
    </LocalizationProvider>
  );
}
