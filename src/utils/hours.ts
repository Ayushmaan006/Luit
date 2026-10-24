import { DayOfWeek, WeeklyHours } from '../types/cafe.ts';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function createWeeklyHours(
  open: string,
  close: string,
  closedDays: DayOfWeek[] = []
): WeeklyHours {
  const result = {} as WeeklyHours;
  DAYS_OF_WEEK.forEach((day) => {
    if (closedDays.includes(day)) {
      result[day] = {
        open: 'Closed',
        close: 'Closed',
        isClosed: true,
      };
    } else {
      result[day] = {
        open,
        close,
        isClosed: false,
      };
    }
  });
  return result;
}

export function parseTimingsToWeekly(timings: string): WeeklyHours {
  // If timings has e.g. "10:00 AM – 10:30 PM (Closed Mondays)"
  const isClosedMondays = /closed\s+mondays?/i.test(timings);
  const parts = timings.replace(/\(.*?\)/g, '').split(/[–-]/);

  const open = parts[0]?.trim() || '10:00 AM';
  const close = parts[1]?.trim() || '10:00 PM';

  return createWeeklyHours(open, close, isClosedMondays ? ['Monday'] : []);
}

export interface DayStatusInfo {
  day: DayOfWeek;
  hoursText: string;
  isClosed: boolean;
  isToday: boolean;
  open: string;
  close: string;
}

export function getFormattedSchedule(
  weeklyHours?: WeeklyHours,
  fallbackTimings?: string
): DayStatusInfo[] {
  const hours = weeklyHours || (fallbackTimings ? parseTimingsToWeekly(fallbackTimings) : createWeeklyHours('10:00 AM', '10:00 PM'));

  // Get current day of week in Indian standard / local time
  const todayIndex = (new Date().getDay() + 6) % 7; // Convert JS 0=Sun to 0=Mon
  const currentDayName = DAYS_OF_WEEK[todayIndex];

  return DAYS_OF_WEEK.map((day) => {
    const dayData = hours[day] || { open: '10:00 AM', close: '10:00 PM', isClosed: false };
    const isClosed = Boolean(dayData.isClosed || dayData.open.toLowerCase() === 'closed');
    const hoursText = isClosed ? 'Closed' : `${dayData.open} – ${dayData.close}`;

    return {
      day,
      hoursText,
      isClosed,
      isToday: day === currentDayName,
      open: dayData.open,
      close: dayData.close,
    };
  });
}

export interface CurrentCafeStatus {
  isOpen: boolean;
  statusBadge: string;
  detailText: string;
  colorClass: string;
}

export function getCurrentCafeStatus(
  weeklyHours?: WeeklyHours,
  fallbackTimings?: string
): CurrentCafeStatus {
  const schedule = getFormattedSchedule(weeklyHours, fallbackTimings);
  const today = schedule.find((s) => s.isToday);

  if (!today || today.isClosed) {
    return {
      isOpen: false,
      statusBadge: 'Closed Today',
      detailText: 'Closed for the day',
      colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
    };
  }

  // Parse open and close times for today
  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const parseToMinutes = (timeStr: string) => {
      const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return null;
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const meridiem = match[3].toUpperCase();

      if (meridiem === 'PM' && hours < 12) hours += 12;
      if (meridiem === 'AM' && hours === 12) hours = 0;

      return hours * 60 + minutes;
    };

    const openMinutes = parseToMinutes(today.open);
    const closeMinutes = parseToMinutes(today.close);

    if (openMinutes !== null && closeMinutes !== null) {
      if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
        return {
          isOpen: true,
          statusBadge: 'Open Now',
          detailText: `Closes at ${today.close}`,
          colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        };
      } else if (currentMinutes < openMinutes) {
        return {
          isOpen: false,
          statusBadge: 'Closed Now',
          detailText: `Opens today at ${today.open}`,
          colorClass: 'text-amber-800 bg-amber-50 border-amber-200',
        };
      } else {
        return {
          isOpen: false,
          statusBadge: 'Closed for the Day',
          detailText: `Closed at ${today.close}`,
          colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
        };
      }
    }
  } catch {
    // Graceful fallback
  }

  return {
    isOpen: true,
    statusBadge: 'Open Today',
    detailText: today.hoursText,
    colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  };
}
