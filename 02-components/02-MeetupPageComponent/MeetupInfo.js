export const MeetupInfo = {
  name: 'MeetupInfo',
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formattedDateAttribute">{{ formattedDate }}</time>
      </li>
    </ul>`,
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleDateString(
        navigator.language,
        this.$options.dateFormatOptions,
      );
    },
    formattedDateAttribute() {
      return this.date.toISOString().split('T')[0];
    },
  },
  dateFormatOptions: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
};
