import React, { useState, useMemo, useEffect } from 'react';
import api from '~/services/api';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { Container, Time } from './styles';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });
      console.log(response);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(
            a => parseISO(a.date).toString() === compareDate.toString()
          ),
        };
      });

      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft color="#fff" size={36} />
        </button>
        <button type="button" onClick={handleNextDay}>
          <strong>{dateFormatted}</strong>
          <MdChevronRight color="#fff" size={36} />
        </button>
      </header>
      <ul>
        {schedule.map(time => (
          <Time>
            <strong>08:00</strong>
            <span>Wilner</span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
