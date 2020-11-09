/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

const oneDayInMS = 86400000;

function getClosestMonday(date) {
  const weekDay = new Date(date).getDay();
  const offsetDays =  weekDay === 0 ? 6 : weekDay - 1;
  return new Date(new Date(date).getTime() - (oneDayInMS * offsetDays));
}

function getDaysInMonth(month,year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1);
}

function getDays(month, year, meetups) {
  const startDate = getClosestMonday(getFirstDayOfMonth(month, year));
  const datesLength = getDaysInMonth(month, year) === 28 && (new Date(startDate)).getDate() === 1
    ? 28
    : 35;
  return new Array(datesLength).fill('').map((day, index) => {
    const calendarItem = new Date(startDate.getTime() + oneDayInMS * index);
    return {
      dayNumber: calendarItem.getDate(),
      isCurrent: calendarItem.getMonth() === month,
      id: calendarItem.getTime(),
      meetups: meetups?.reduce((acc, meetup) => {
        if (calendarItem.toDateString() === (new Date(meetup.date)).toDateString()) {
          acc.push(meetup);
        }
        return acc;
      }, []),
    };
  });
}

function formatHeaderDate(month, year) {
  return getFirstDayOfMonth(month, year).toLocaleDateString(navigator.language, {
    year: 'numeric',
    month: 'long',
  });
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',
  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="decrementMonth"></button>
          <div>{{ formattedDate }}</div>
          <button class="rangepicker__selector-control-right" @click="incrementMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="cell in calendarCells"
          :key="cell.id"
          :class="['rangepicker__cell', { 'rangepicker__cell_inactive': !cell.isCurrent }]">
          {{ cell.dayNumber }}
          <a
            v-for="meetup in cell.meetups"
            :key="meetup.id"
            class="rangepicker__event">
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      month: (new Date()).getMonth(),
      year: (new Date()).getFullYear(),
    };
  },
  computed: {
    formattedDate() {
      return formatHeaderDate(this.month, this.year);
    },
    calendarCells() {
      return getDays(this.month, this.year, this.meetups);
    }
  },
  methods: {
    incrementMonth() {
      if (this.month === 11) {
          this.month = 0;
          this.year += 1;
      } else {
        this.month += 1;
      }
    },
    decrementMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
    }
  },
};
