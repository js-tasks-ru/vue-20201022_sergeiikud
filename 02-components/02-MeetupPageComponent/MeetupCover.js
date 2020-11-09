export const MeetupCover = {
  template: `<div class="meetup-cover" :style="bgStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
  props: {
    link: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Название митапа',
    },
  },
  computed: {
    bgStyle() {
      return this.link
        ? `--bg-url: url(${this.link})`
        // : '--bg-url: url("https://course-vue.javascript.ru/api/images/2")';
        : '';
    },
  },
};
