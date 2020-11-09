import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',
  template: `
    <div class="meetup-agenda">
      <MeetupAgendaItem
        v-for="agendaItem in agenda"
        :key="agendaItem.id"
        :agendaItem="agendaItem" />
    </div>`,
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
