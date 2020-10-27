import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/** Locale */
const LOCALE = 'ru-RU';

/** Date format options */
const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param imageId - meetup image id
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const titles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const icons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

/**
 * Returns meetup data by id
 * @param id - meetup id
 * @return {object} - meetup data object
 */
async function getMeetupById(id) {
  const response = await fetch(`${API_URL}/meetups/${id}`);
  const result = await response.json();
  if (response.ok) {
    return Promise.resolve(result);
  } else {
    return Promise.reject(`Status: ${result.statusCode}: ${result.message}`);
  }
}

/**
 * Returns meetup data by id
 * @param date - in ms
 * @return {string} - formatted date
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString(LOCALE, DATE_FORMAT_OPTIONS);
}

function formatToDateTime(date) {
  return new Date(date).toISOString().split('T')[0];
}

export const app = new Vue({
  el: '#app',
  data() {
    return {
      id: MEETUP_ID,
      meetup: {},
      isLoading: false,
      isFetchData: false,
      error: ''
    }
  },
  computed: {
    meetupCoverStyle() {
      const imageId = this.meetup.imageId;
      if (!imageId) return '';
      return `--bg-url: url(${getMeetupCoverLink(imageId)})`;
    },
    isEmptyAgenda() {
      return !this.meetup.agenda?.length;
    },
    isShowMeetup() {
      return !this.isLoading && this.isFetchData;
    },
    preparedAgenda() {
      return this.meetup?.agenda.map(item => ({
        id: item.id,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        speaker: item.speaker,
        language: item.language,
        description: item.description,
        iconUrl: this.getItemIconUrl(item),
        title: this.getTitle(item),
        isShowSpeakerBlock: this.isShowDot(item),
        isShowDot: this.isShowSpeakerBlock(item)
      }));
    },
    formattedMeetupDate() {
      return this.meetup.date ? formatDate(this.meetup.date) : '';
    },
    dateTime() {
      return this.meetup.date ? formatToDateTime(this.meetup.date) : '';
    }
  },
  watch: {
    id() {
      this.loadMeetups();
    }
  },
  mounted() {
    this.loadMeetups();
  },
  methods: {
    async loadMeetups() {
      try {
        this.isLoading = true;
        this.meetup = await getMeetupById(this.id);
        this.isFetchData = true;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    getItemIconUrl({ type }) {
      return `/assets/icons/icon-${icons[type]}.svg`;
    },
    getTitle({ title, type }) {
      return title || titles[type];
    },
    isShowDot({ speaker, language }) {
      return Boolean(speaker && language);
    },
    isShowSpeakerBlock({ speaker, language }) {
      return Boolean(speaker || language);
    }
  }
});
