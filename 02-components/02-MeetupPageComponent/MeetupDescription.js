export const MeetupDescription = {
  name: 'MeetupDescription',
  template: `<p v-if="description" class="meetup-description">{{ description }}</p>`,
  props: {
    description: {
      type: String,
      default: '',
    },
  },
};
