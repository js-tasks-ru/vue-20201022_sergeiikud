import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',
  template: `<MeetupView v-if="isShowMeetup" :meetup="meetup" />`,
  components: {
    MeetupView,
  },
  data() {
    return {
      meetup: null,
    };
  },
  computed: {
    isShowMeetup() {
      return Boolean(this.meetup);
    },
  },
  mounted() {
    this.loadMeetupData();
  },
  methods: {
    async loadMeetupData() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.meetup = await fetchMeetup(MEETUP_ID);
      console.log(this.meetup);
    },
  },
};
